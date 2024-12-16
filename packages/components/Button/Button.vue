<script lang="ts" setup>
import { computed, inject, ref } from "vue";
import type { ButtonProps, ButtonEmits, ButtonInstance } from "./type";
import { throttle } from "lodash-es";
import ErIcon from '../Icon/Icon.vue';
import { BUTTON_GROUP_CTX_KEY } from "./Constant";
defineOptions({ name: "ErButton" });
const props = withDefaults(defineProps<ButtonProps>(), {
    tag: "button",
    nativeType: "button",
    throttleDuration: 500
});

const slots = defineSlots();

const emits = defineEmits<ButtonEmits>();

const _ref = ref<ButtonInstance>();

const ctx = inject(BUTTON_GROUP_CTX_KEY, void 0);

const size = computed(() => ctx?.size ?? props?.size ?? '');

const type = computed(() => ctx?.type ?? props?.type ?? '');

const disabled = computed(() => ctx?.disabled || props?.disabled || false);

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
                <er-icon spin class="loading-icon" :icon="loadingIcon ?? 'spinner'" :style="iconStyle"
                    size="1x"></er-icon>
            </slot>
        </template>

        <er-icon v-if="icon && !loading" :icon="icon" :style="iconStyle" size="1x"></er-icon>

        <slot></slot>
    </component>
</template>
<style scoped>
@import './style.css';
</style>
