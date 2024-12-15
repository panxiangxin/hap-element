<script lang="ts" setup>
import { computed, ref } from "vue";
import type { ButtonProps, ButtonEmits, ButtonInstance } from "./type";
import { throttle } from "lodash-es";
import { ErIcon } from 'hap-element';
defineOptions({ name: "ErButton" });
const props = withDefaults(defineProps<ButtonProps>(), {
    tag: "button",
    nativeType: "button",
    throttleDuration: 500
});

const slots = defineSlots();

const emits = defineEmits<ButtonEmits>();

const _ref = ref<ButtonInstance>();

defineExpose({
    ref: _ref
});

const handlerClick = (e: MouseEvent) => emits("click", e);

const handlerClickThrottle = throttle(handlerClick, props.throttleDuration);

const iconStyle = computed(() => {
    return {
        marginRight: slots.default ? "6px" : "0px"
    };
})

</script>
<template>
    <component :is="tag" ref="_ref" class="er-button" :type="tag === 'button' ? nativeType : void 0"
        :disabled="disabled || loading ? true : void 0" :class="{
            [`er-button--${type}`]: type,
            [`er-button--${size}`]: size,
            'is-plain': plain,
            'is-round': round,
            'is-circle': circle,
            'is-disabled': disabled,
            'is-loading': loading
        }" @click="useThrottle ? handlerClickThrottle($event) : handlerClick($event)">
        <template v-if="loading">
            <slot name="loading">
                <er-icon spin class="loading-icon" :icon="loadingIcon ?? 'spinner'" :style="iconStyle" size="1x"></er-icon>
            </slot>
        </template>

        <er-icon v-if="icon && !loading" :icon="icon" :style="iconStyle" size="1x"></er-icon>

        <slot></slot>
    </component>
</template>
<style scoped>
@import './style.css';
</style>
