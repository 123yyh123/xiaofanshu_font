const province = [{
		"province": "北京市",
		"abbreviation": "北京"
	},
	{
		"province": "天津市",
		"abbreviation": "天津"
	},
	{
		"province": "河北省",
		"abbreviation": "河北"
	},
	{
		"province": "山西省",
		"abbreviation": "山西"
	},
	{
		"province": "内蒙古自治区",
		"abbreviation": "内蒙古"
	},
	{
		"province": "辽宁省",
		"abbreviation": "辽宁"
	},
	{
		"province": "吉林省",
		"abbreviation": "吉林"
	},
	{
		"province": "黑龙江省",
		"abbreviation": "黑龙江"
	},
	{
		"province": "上海市",
		"abbreviation": "上海"
	},
	{
		"province": "江苏省",
		"abbreviation": "江苏"
	},
	{
		"province": "浙江省",
		"abbreviation": "浙江"
	},
	{
		"province": "安徽省",
		"abbreviation": "安徽"
	},
	{
		"province": "福建省",
		"abbreviation": "福建"
	},
	{
		"province": "江西省",
		"abbreviation": "江西"
	},
	{
		"province": "山东省",
		"abbreviation": "山东"
	},
	{
		"province": "河南省",
		"abbreviation": "河南"
	},
	{
		"province": "湖北省",
		"abbreviation": "湖北"
	},
	{
		"province": "湖南省",
		"abbreviation": "湖南"
	},
	{
		"province": "广东省",
		"abbreviation": "广东"
	},
	{
		"province": "广西壮族自治区",
		"abbreviation": "广西"
	},
	{
		"province": "海南省",
		"abbreviation": "海南"
	},
	{
		"province": "重庆市",
		"abbreviation": "重庆"
	},
	{
		"province": "四川省",
		"abbreviation": "四川"
	},
	{
		"province": "贵州省",
		"abbreviation": "贵州"
	},
	{
		"province": "云南省",
		"abbreviation": "云南"
	},
	{
		"province": "西藏自治区",
		"abbreviation": "西藏"
	},
	{
		"province": "陕西省",
		"abbreviation": "陕西"
	},
	{
		"province": "甘肃省",
		"abbreviation": "甘肃"
	},
	{
		"province": "青海省",
		"abbreviation": "青海"
	},
	{
		"province": "宁夏回族自治区",
		"abbreviation": "宁夏"
	},
	{
		"province": "新疆维吾尔自治区",
		"abbreviation": "新疆"
	},
	{
		"province": "台湾省",
		"abbreviation": "台湾"
	},
	{
		"province": "香港特别行政区",
		"abbreviation": "香港"
	},
	{
		"province": "澳门特别行政区",
		"abbreviation": "澳门"
	}
]

export const provinceToAbbr = (inputProvince) => {
  const result = province.find(item => item.province === inputProvince);
  return result ? result.abbreviation : undefined;
};
