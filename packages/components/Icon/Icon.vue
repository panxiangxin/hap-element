<script setup lang="ts">
import { computed } from 'vue';
import type { IconProps } from './types';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { omit } from 'lodash-es';

defineOptions({
    name: 'ErIcon',
});

const props = defineProps<IconProps>();

const filterProps = computed(() => omit(props, ['type', 'color']));

const computedStyle = computed(() => props.color ? { color: props.color } : void 0);

</script>
<template>
    <i class="er-icon" :class="`er-icon-${props.type}`" :style="computedStyle">
        <font-awesome-icon v-bind="filterProps" />
    </i>
</template>

<style>
@import './style.css';
</style>