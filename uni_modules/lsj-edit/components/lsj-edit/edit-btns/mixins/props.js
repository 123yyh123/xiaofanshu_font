module.exports = {
	props: {
		edit: {
			type: Object,
			required: true,
		},
		color: {
			type: String,
			default: '#999'
		},
		selectedColor: {
			type: String,
			default: '#00aaff'
		},
		fontColor: {
			type: Array,
			default: () => [
				'#303133',
				'#666666',
				'#999999',
				'#E93423',
				'#ED6940',
				'#E7B23E',
				'#59C780',
				'#4EA9FA',
				'#2B61F5',
				'#675BED',
			]
		},
		bgColor: {
			type: Array,
			default: () => [
				'#E8E8E8',
				'#FED0D0',
				'#FBF0B8',
				'#C3ECDA',
				'#B2D1FF',
				'#E0C4FF',
			]
		},
		tabs: {
			type: Array,
			default: () => [{
					name: '#',
					icon: 'lsj-icon lsj-icon-huati'
				},
				{
					name: '@',
					icon: 'lsj-icon lsj-icon-aite'
				},
			]
		},
		emojiList: {
			type: Array,
			default: () => [
				'😀', '😁', '😂', '😅', '😋', '😎', '😍', '😘', '🙂', '🤗',
				'🤔', '🙄', '😏', '😣', '😥', '😮', '😪', '😫', '😴', '😌',
				'😜', '😒', '😓', '😕', '🙃', '😲', '😤', '😢', '😭', '😦',
				'😨', '😰', '😱', '😳', '😬', '😵', '😡', '😠', '😷', '😇',
				'🤓', '😈', '👹', '💀', '👻', '👄', '❤', "💔", "👅", '👽',
				'🙈', '🙉', '👦', '👨', '👩'
			]
		}
	}
}
