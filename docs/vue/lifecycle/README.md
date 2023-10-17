# 生命周期

在 Vue 3 中，生命周期函数被重构为基于 Composition API 的函数，而不再使用传统的生命周期钩子函数。这种重构使得组件的逻辑更加清晰和灵活；

数据来源于Vue3官网文档 [lifecycle](https://cn.vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram) 图示；

### `setup`()

`setup` 函数是 Composition API 的核心。它在组件创建之前执行，用于设置组件的初始状态、引用和事件监听。在 `setup` 函数中，你可以返回响应式数据、计算属性、方法等，这些返回值将会在组件实例中可用；

在 Vue 3 的 Composition API 中 `beforeCreate` 和 `created` 这两个生命周期钩子函数不能直接使用，取而代之的是`setup`函数，如果你非常需要在 Vue 3 中模拟类似 `beforeCreate` 和 `created` 的行为，你可以在 `setup` 函数内部使用 `onBeforeMount` 和 `onMounted` 这两个 Composition API 函数来达到相似的效果，分别在组件挂载时机之前和之后执行代码；

在 Vue 3 的 Composition API 中，`setup` 函数内部没有 `this` 指向。`setup` 函数是一个普通的 JavaScript 函数，不具备 Vue 实例的特殊性；

`setup`函数只会在组件初始化的时候执行一次，在 `beforeCreate` 和 `created` 之前执行；

------


### `onBeforeMount`()

在Vue组件挂载开始之前被执行，相关的`render`函数首次被调用，`onBeforeMount` 生命周期钩子在组件即将被挂载到 DOM 之前被调用。这是一个适合执行一些初始化工作的地方，比如数据的获取或订阅外部事件。在 `onBeforeMount` 钩子中，组件已经被创建，但还没有被挂载到 DOM 上；

```vue
<template>
    <div ref = "myElement">This is a DOM element</div>
</template>
<script setup>
import { ref, onBeforeMount } from 'vue'

const myElement = ref(null)
onBeforeMount(() => {
    console.log('Component is about to be mounted')
    console.log(myElement.value) // 输出：null
})
</script>
```

------


### `onMounted`()

在Vue组件挂载之后被执行，你可以在这里执行初始化逻辑、订阅外部事件、发送网络请求等。这是一个适合执行需要依赖 DOM 元素的操作的地方，比如修改 DOM、执行动画或初始化第三方库；

```vue
<template>
    <div ref = "myElement">This is a DOM element</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const myElement = ref(null)

onMounted(() => {
    console.log('Component has been mounted')
    // 在onMounted钩子内部获取DOM元素
    console.log(myElement.value) // 输出: <div>This is a DOM element</div>
})
</script>
```

------


### `onBeforeUpdate`()

`onBeforeUpdate`生命周期函数被触发了，说明数据被修改了，此时将要把最新的数据渲染到DOM结构中，但还没有渲染，因此该阶段看到的DOM元素的内容是旧数据；

注：如果数据发生了更新但视图没有使用该数据，`onBeforeUpdate` 钩子将不会触发，Vue 的响应式系统会智能地追踪那些在模板中被使用的数据。只有被使用的数据发生变化才会执行；

```vue
<script setup>
import { onBeforeUpdate, onUpdated, ref } from 'vue'

const count = ref(0)
const myElement =ref(null)
onBeforeUpdate(() => {
    console.log('onBeforeUpdate Hook Triggered');
    console.log('Old count:', myElement.value.innerText);
})

onUpdated(() => {
    console.log('onUpdated Hook Triggered');
    console.log('New count:', myElement.value.innerText);
})

const increment = () => {
    count.value++;
}
</script>

<template>
    <button @click="increment">Increment</button>
    <!--如果视图不更新，onBeforeUpdate 与 onUpdated 就不会被执行-->
    <div ref="myElement">{{ count }}</div>
</template>
```

------


### `onUpdated`()

在 Vue 3 的 Composition API 中，`onUpdated` 钩子函数在组件的 DOM 更新之后触发，`onUpdated`生命周期函数被触发了，说明数据被修改了，此时已经把最新的数据渲染到了DOM结构中，因此该阶段看到的DOM元素的内容是最新内容，你可以访问到新的数据状态

需要注意的是，`onBeforeUpdate` 和 `onUpdated` 钩子函数可以在同一个组件中被多次使用，用于执行不同的逻辑。在这两个钩子函数中，你可以访问组件的响应式数据，但需要确保不会在其中修改这些数据，否则可能引起循环更新。这两个钩子函数提供了控制组件数据更新前后行为的能力，使得你可以在不同阶段执行特定的操作。

```vue
<script setup>
import { onBeforeUpdate, onUpdated, ref } from 'vue'

const count = ref(0)
const myElement =ref(null)
onBeforeUpdate(() => {
    console.log('onBeforeUpdate Hook Triggered');
    console.log('Old count:', myElement.value.innerText);
})

onUpdated(() => {
    console.log('onUpdated Hook Triggered');
    console.log('New count:', myElement.value.innerText);
})

const increment = () => {
    count.value++;
}
</script>

<template>
    <button @click="increment">Increment</button>
    <!--如果视图不更新，onBeforeUpdate 与 onUpdated 就不会被执行-->
    <div ref="myElement">{{ count }}</div>
</template>
```

------


### `onBeforeUnmount`()

在 Vue 3 中`onBeforeUnmount` 钩子函数会在组件即将被卸载（销毁）之前被执行。你可以在这个钩子中执行一些清理操作，例如取消订阅、清除定时器、释放资源等操作；

```ts
function onBeforeUnmount(callback: () => void): void
```

------


### `onUnmounted`()

在 Vue 3 中`onUnmounted` 钩子会在组件被卸载（销毁）之后被调用。在这个钩子中，组件已经不再受 Vue 管理，无法再访问组件的状态和属性；

```ts
function onUnmounted(callback: () => void): void
```

------

::: tip tip
来自官网的流程图！
:::

![lifecycle](../../.vuepress/public/lifecycle.16e4c08e.png)

::: tip 拨开云雾见青天
生命周期大致的阶段分以下为4个阶段，使用最多的阶段是挂载阶段和更新阶段；

创建阶段：

- `setup`：组件创建前和创建后执行，执行包含`beforeCreate`和`created`

挂载阶段：

- `onBeforeMount`：组件挂载前执行

- `onMounted`：组件挂载后执行

更新阶段：

- `onBeforeUpdate`：数据和DOM更新前执行

- `onUpdated`：数据和DOM更新后执行

销毁阶段：

- `onBeforeUnmount`：卸载前执行

- `onUnmounted`：卸载后执行

:::

相关知识点拓展：

`onErrorCaptured`只捕获其下子组件产生的错误并处理错误

`onRenderTracked`用于在组件渲染时跟踪被侦测的响应式数据，当被侦测的数据在组件渲染期间被访问时，这个钩子函数会被触发

`onRenderTriggered`响应式对象或 ref 引发重新渲染时

`onActivated`包裹的组件`keep-alive>`在组件被激活时调用

`onDeactivated`包裹的组件`keep-alive>`在组件被离开时调用

`onServerPrefetch`用于处理服务器端渲染（Server-Side Rendering，SSR）时，服务端数据的预取