module.exports = {
	data() {
		return {
			// 字体
			fontZT: [{
					name: 'header',
					value: 'H1',
					checkID: '1',
					icon: 'lsj-icon-format-header-'
				},
				{
					name: 'header',
					value: 'H2',
					checkID: '2',
					icon: 'lsj-icon-format-header-1'
				},
				{
					name: 'header',
					value: 'H3',
					checkID: '3',
					icon: 'lsj-icon-format-header-2'
				},
				{
					name: 'header',
					value: 'H4',
					checkID: '4',
					icon: 'lsj-icon-format-header-3'
				},
				{
					name: 'header',
					value: 'H5',
					checkID: '5',
					icon: 'lsj-icon-formatheader5'
				},
				{
					name: 'header',
					value: 'H6',
					checkID: '6',
					icon: 'lsj-icon-formatheader6'
				},
				{
					name: 'bold',
					checkID: true,
					icon: 'lsj-icon-ct'
				},
				{
					name: 'italic',
					checkID: true,
					icon: 'lsj-icon-italic'
				},
				{
					name: 'underline',
					checkID: true,
					icon: 'lsj-icon-T-xiahuaxian'
				},
				{
					name: 'strike',
					checkID: true,
					icon: 'lsj-icon-shanchuxian'
				},
			],
			// 格式
			fontGS: [{
					name: 'marginTop',
					value: '20px',
					checkID: '20px',
					icon: 'lsj-icon-723bianjiqi_duanhouju'
				},
				{
					name: 'marginBottom',
					value: '20px',
					checkID: '20px',
					icon: 'lsj-icon-a-723bianjiqi_duanhouju'
				},
				{
					name: 'align',
					value: 'left',
					checkID: 'left',
					icon: 'lsj-icon-zuoduiqi'
				},
				{
					name: 'align',
					value: 'center',
					checkID: 'center',
					icon: 'lsj-icon-juzhongduiqi'
				},
				{
					name: 'align',
					value: 'right',
					checkID: 'right',
					icon: 'lsj-icon-youduiqi'
				},
				{
					name: 'align',
					value: 'justify',
					checkID: 'justify',
					icon: 'lsj-icon-zuoyouduiqi'
				},
				{
					name: 'indent',
					value: '-1',
					checkID: 'indent',
					icon: 'lsj-icon-outdent'
				},
				{
					name: 'indent',
					value: '+1',
					checkID: 'indent',
					icon: 'lsj-icon-indent'
				},
				{
					name: 'direction',
					value: 'rtl',
					checkID: 'rtl',
					icon: 'lsj-icon-direction-rtl'
				},
				{
					name: 'lineHeight',
					value: '2',
					checkID: '2',
					icon: 'lsj-icon-line-height'
				},
				{
					name: 'letterSpacing',
					value: '2em',
					checkID: '2em',
					icon: 'lsj-icon-wenben'
				},
				{
					name: 'script',
					value: 'sub',
					checkID: 'sub',
					icon: 'lsj-icon-zitixiabiao'
				},
				{
					name: 'script',
					value: 'super',
					checkID: 'super',
					icon: 'lsj-icon-zitishangbiao'
				},
				{
					name: 'list',
					value: 'check',
					checkID: 'check',
					icon: 'lsj-icon--checklist'
				},
				{
					name: 'list',
					value: 'ordered',
					checkID: 'ordered',
					icon: 'lsj-icon-a-texteditordigitallist-line'
				},
				{
					name: 'list',
					value: 'bullet',
					checkID: 'bullet',
					icon: 'lsj-icon-editor-list-bulleted'
				},
				{
					name: 'insertDivider',
					value: '',
					checkID: true,
					icon: 'lsj-icon-editor-divider',
					customFn: 'tool'
				},
				{
					name: 'removeFormat',
					value: '',
					checkID: true,
					icon: 'lsj-icon-clearedformat',
					customFn: 'tool'
				},
				{
					name: 'clear',
					value: '',
					checkID: 'clear',
					icon: 'lsj-icon-shanchu',
					customFn: 'tool'
				},
			],
			statusObj: {},
			fontsize: 16,
		}
	},
	created() {
		// 监听光标所在位置状态
		this.edit.$on('edit:statuschange', this.statuschange);
	},
	methods: {
		// 根据光标位置更新字号
		statuschange(e) {
			this.statusObj = e.detail;
			if (this.statusObj.hasOwnProperty('fontSize')) {
				this.fontsize = parseInt(this.statusObj['fontSize']);
			}
			else {
				this.fontsize = 16;
			}
		},
		// 字号按钮点击
		fontSetSize(up = false) {
			if (this.fontsize <= 10 || this.fontsize >= 50) {
				return;
			}
			let font = up ? this.fontsize + 1 : this.fontsize - 1;
			return this.fontSliderChange({detail: {value: font}});
		},
		// 字号滑动条
		fontSliderChange({
			detail
		}) {
			this.fontsize = detail.value;
			this.edit.format('fontSize', detail.value + 'px');
		},
		// 列表点击事件
		fontCell_Click(item) {
			this.edit[item.customFn ? item.customFn : 'format'](item.name, item.value);
		},
	}
}
