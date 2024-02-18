<template>
  <view class="da-dropdown-footer">
    <view class="da-dropdown-footer--reset" @click="handleReset()">{{ resetText || '重置' }}</view>
    <view class="da-dropdown-footer--confirm" @click="handleConfirm()">
      {{ confirmText || '确定' }}
    </view>
  </view>
</template>

<script>
export default {
  name: 'PartDropdownFooter',
  props: {
    resetText: {
      type: String,
      default: '重置',
    },
    confirmText: {
      type: String,
      default: '确定',
    },
  },
  methods: {
    handleReset() {
      this.$emit('reset')
    },
    handleConfirm() {
      this.$emit('confirm')
    },
  },
}
</script>

<style lang="scss" scoped>
.da-dropdown-footer {
  display: flex;
  align-items: center;
  padding: 24rpx;
  margin-top: 20rpx;

  &--reset,
  &--confirm {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    height: 66rpx;
    font-size: 28rpx;
    color: #555;
    background-color: #fff;
    border: 2rpx solid #ccc;
    border-radius: 66rpx;
  }

  &--confirm {
    margin-left: 24rpx;
    color: #fff;
    background-color: var(--dropdown-theme-color);
    border-color: var(--dropdown-theme-color);
  }

  &--reset:hover,
  &--confirm:hover {
    opacity: 0.8;
  }
}
</style>
