import type { Component, Ref } from "vue";

export type ButtonType = "primary" | "success" | "warning" | "danger" | "info";
export type ButtonSize = "large" | "default" | "small";
export type NativeType = "button" | "submit" | "reset";

export interface ButtonProps {
    tag?: string | Component;
    type?: ButtonType;
    size?: ButtonSize;
    nativeType?: NativeType;
    disabled?: boolean;
    loading?: boolean;
    icon?: string;
    // onClick?: (e: MouseEvent) => void;
    circle?: boolean;
    plain?: boolean;
    round?: boolean;
    autofocus?: boolean;
    loadingIcon?: string;
    useThrottle?: boolean;
    throttleDuration?: number;
}

export interface ButtonEmits {
    (e: "click", event: MouseEvent): void;
}

export interface ButtonInstance {
    ref: Ref<HTMLButtonElement | void>
}