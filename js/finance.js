$(function(){

	/* 首页前言以及须知按钮 */
	var
		$foreword_a = $('.index_block .foreword a'),
		$notice_a = $('.index_block .notice a'),
		$start_a = $('.index_block .start a'),
		$index_block = $('.index_block'),
		$quest_block = $('.quest_block'),
		$index_text_block = $('.index_text_block'),
		$foreword_block = $('.index_text_block .foreword_block'),
		$notice_block = $('.index_text_block .notice_block'),
		$index_close = $('.index_text_block .close_btn button');
	$foreword_a.click(function(event){
		event.preventDefault();
		$foreword_block.show();
		$index_text_block.fadeIn();
	})
	$notice_a.click(function(event){
		event.preventDefault();
		$notice_block.show();
		$index_text_block.fadeIn();
	})
	$index_close.click(function(event){
		event.preventDefault();
		$index_text_block.fadeOut();
		$foreword_block.fadeOut();
		$notice_block.fadeOut();
	})

	/* 进入问答 */
	$start_a.click(function(event){
		event.preventDefault();
		$index_block.fadeOut();
		$quest_block.fadeIn();
	})

	/* 问题页面 */

	// 导入题目
	var	
		quest_num,//题目号码
		$quest_num = $('.quest_block .quest_num p:first-child'),
		q_list = [
				{
					'q':'要警惕“担保”、“保证收益”类的宣传，警惕一些通过论坛、网帖、甚至街头路边、市场集市等线下渠道以“<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>”名义招揽客户的机构组织和人员。',
					'a1':'P2P',
					'a2':'O2O',
					'a3':'P2C',
					'a4':'C2C',
					't':'要警惕“担保”、“保证收益”类的宣传，警惕一些通过论坛、网帖、甚至街头路边、市场集市等线下渠道以“P2P”名义招揽客户的机构组织和人员。'
				},
				{
					'q':'同一自然人在同一网络借贷信息中介机构平台的借款余额上限不超过人民币<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>；同一法人或其他组织在同一网络借贷信息中介机构平台的借款余额上限不超过人民币<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>；',
					'a1':'20万元,100万元',
					'a2':'30万元,150万元',
					'a3':'50万元,200万元',
					'a4':'10万元,80万元',
					't':'同一自然人在同一网络借贷信息中介机构平台的借款余额上限不超过人民币20万元；同一法人或其他组织在同一网络借贷信息中介机构平台的借款余额上限不超过人民币100万元'
				},
				{
					'q':'私募基金行业非法集资具有如下特征：一是募集方式一般采用公开宣传、推介方式引诱投资人；二是募集对象一般为社会公众；三是一般<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>；四是投资人数没有上限，多多益善；五是一般没有投资风险提示，许诺保本高收益',
					'a1':'不设最低投资门槛，或者门槛很低', 
					'a2':'设置最低投资门槛，或者不设门槛',
					'a3':'不设最高投资门槛，或者门槛很低',
					'a4':'设置最高投资门槛，或者不设门槛',
					't':'私募基金行业非法集资具有如下特征：一是募集方式一般采用公开宣传、推介方式引诱投资人；二是募集对象一般为社会公众；三是一般不设最低投资门槛，或者门槛很低；四是投资人数没有上限，多多益善；五是一般没有投资风险提示，许诺保本高收益。'
				},
				{
					'q':'保险公司及其工作人员在保险业务活动的行为下列哪些说法是错的？',
					'a1':'不得对投保人隐瞒与保险合同有关的重要情况',
					'a2':'不得利用开展保险业务为其他机构或者个人牟取不正当利益',
					'a3':'可以利用保险代理人、保险经纪人或者保险评估机构，从事以虚构保险中介业务或者编造退保等方式套取费用',
					'a4':'不可以泄露在业务活动中知悉的投保人、被保险人的商业秘密',
					't':'无'
				},
				{
					'q':'如何应对智能手机APP使用风险,以下做法不正确的是',
					'a1':'从正规渠道谨慎下载APP',
					'a2':'关注App权限获取问题',
					'a3':'轻易点击APP弹出广告',
					'a4':'定期检查智能手机',
					't':'无'
				},
				{
					'q':'被执行人具有履行能力而不履行生效法律文书确定的义务，并具有下列情形之一的，人民法院应当将其纳入失信被执行人名单，依法对其进行信用惩戒。<br>①以伪造证据、暴力、威胁等方法妨碍、抗拒执行的；<br>②以虚假诉讼、虚假仲裁或者以隐匿、转移财产等方法规避执行的；<br>③违反财产报告制度的；<br>④违反限制高消费令的；<br>⑤被执行人无正当理由拒不履行执行和解协议的；<br>⑥其他有履行能力而拒不履行生效法律文书确定义务的；',
					'a1':'①②④⑤⑥',
					'a2':'②③④',
					'a3':'①③④⑤',
					'a4':'①②③④⑤⑥',
					't':'无'
				},
				{
					'q':'《最高人民法院关于公布失信被执行人名单信息的若干规定》中第四条规定： 记载和公布的失信被执行人名单信息应当包括：<br>①作为被执行人的法人或者其他组织的名称、组织机构代码、法定代表人或者负责人姓名；<br>②作为被执行人的自然人的姓名、性别、年龄、身份证号码；<br>③生效法律文书确定的义务和被执行人的履行情况；<br>④被执行人失信行为的具体情形；<br>⑤执行依据的制作单位和文号、执行案号、立案时间、执行法院；<br>⑥人民法院认为应当记载和公布的不涉及国家秘密、商业秘密、个人隐私的其他事项。',
					'a1':'①②③④⑤⑥',
					'a2':'②③④',
					'a3':'①③④⑤',
					'a4':'①②③⑤',
					't':'无'
				},
				{
					'q':'商业银行销售理财产品，应当遵循(<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>)原则，充分揭示风险，保护客户合法权益，不得对客户进行误导销售。',
					'a1':'公平、公开、公正',
					'a2':'公开、透明、诚信',
					'a3':'公平、公正、透明',
					'a4':'透明、公平、诚信',
					't':'无'
				},
				{
					'q':'理财产品宣传销售文本应当全面、客观反映理财产品的重要特性和与产品有关的重要事实，语言表述应当真实、准确和清晰，不得有下列情形：<br>①虚假记载、误导性陈述或者重大遗漏；<br>②违规承诺收益或者承担损失；<br>③夸大或者片面宣传理财产品，违规使用安全、保证、承诺、保险、避险、有保障、高收益、无风险等与产品风险收益特性不匹配的表述；<br>④登载单位或者个人的推荐性文字；<br>⑤在未提供客观证据的情况下，使用“业绩优良”、“名列前茅”、“位居前列”、“最有价值”、“首只”、“最大”、“最好”、“最强”、“唯一”等夸大过往业绩的表述；',
					'a1':'①②③④⑤',
					'a2':'②③④',
					'a3':'③④⑤',
					'a4':'①②③⑤',
					't':'无'
				},
				{
					'q':'上市公司通过(<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>)形式向投资者披露其经营状况的有关信息。',
					'a1':'年度报告',
					'a2':'中期报告',
					'a3':'临时报告',
					'a4':'以上都是',
					't':'无'
				}
				],
		a_list = '11113341114',//答案
		wrong_count,//用于生成错误答案中的错误符号
		$tips_content = $('.tips_block .tips_content'),
		$quest = $('.quest_block .quest');
		for (var i=0;i<q_list.length;i++) {
			wrong_count = [1,2,3,4];
			q_list[i]['a' + a_list[i+1]] = q_list[i]['a' + a_list[i+1]] + '<div class="true"></div>';
			wrong_count.splice((a_list[i+1] - 1),1);
			for (var k=0;k<wrong_count.length;k++) {
				q_list[i]['a' + wrong_count[k]] = q_list[i]['a' + wrong_count[k]] + '<div class="wrong"></div>';
			}
			$quest.append($(
				'<div class="quest' + (i+2) + '" style="display:none;"><p>' + q_list[i].q + '</p>' + '<div class="ans' + (i+2) +'">' + 
				'<ul><li data-id="1"><span>A</span>' + q_list[i].a1 + '</li>' + 
				'<li data-id="2"><span>B</span>' + q_list[i].a2 + '</li>' + 
				'<li data-id="3"><span>C</span>' + q_list[i].a3 + '</li>' + 
				'<li data-id="4"><span>D</span>' + q_list[i].a4 + '</li>' + '</ul></div>'
				));
			$tips_content.append($(
				'<div class="text tips' + (i+2) + '" style="display:none;"><p>' + q_list[i].t +'</p></div>'
				))
		}

	// 提示功能
	var
		$tips_block = $('.quest_block .tips_block'),
		$tips_close = $('.tips_block .close_btn button'),
		$tips_btn = $('.quest_block .tips a');
	$tips_btn.click(function(event){
		event.preventDefault();
		quest_num = Number($quest_num.text());
		$('.tips_block').fadeIn();
		$('.tips_block .tips' + quest_num).fadeIn();
	})
	$tips_close.click(function(){
		quest_num = Number($('.quest_block .quest_num p:first-child').text());
		$('.tips_block').fadeOut();
		$('.tips_block .tips' + quest_num).fadeOut();
	})

	// 答题功能
	var
		$settimeout = $('.settimeout p'),
		true_num = 0;
	for (var n=0;n<11;n++) {
		$('.quest' + (n+1) + ' li').click(function(){
			$(this).addClass('active');
			if ($(this).data('id') == a_list[$(this).parent('ul').parent().attr('class').slice(3,5)-1]) {
				true_num += 3;
				$settimeout.text(true_num + '.000')
			};
			$(this).parent('ul').find('.true').fadeIn();
			$(this).find('div').fadeIn();
			$(this).parent('ul').find('li').off('click');
	})
	}

	// 下一题，上一题功能
	var
		$pre_btn = $('.quest_block .pre a'),
		$next_btn = $('.quest_block .next a'),
		$before_text = $('.before_text'),
		$money_block = $('.money_block'),
		$before_text_span = $('.before_text span');
		$next_btn.click(function(event){
			event.preventDefault();
			quest_num = Number($quest_num.text());
			if (quest_num<11) {
				quest_num += 1;
				if (quest_num<10) {
					$quest_num.text('0' + quest_num);
				} else {
					$quest_num.text(quest_num);
				}
				$('.quest' + (quest_num-1)).hide();
				$('.quest' + (quest_num)).show();
			} else if (quest_num == 11) {
				$quest_block.hide();
				$before_text_span.text(true_num);
				$('.money_block').show();
				$settimeout.text(true_num + '.000');
				$before_text.show();
			}
		})
		$pre_btn.click(function(event){
			event.preventDefault();
			quest_num = Number($quest_num.text());
			if (1<quest_num) {
				quest_num -= 1;
				if (quest_num<10) {
					$quest_num.text('0' + quest_num);
				} else {
					$quest_num.text(quest_num);
				}
				$('.quest' + (quest_num+1)).hide();
				$('.quest' + (quest_num)).show();
			} else if (quest_num == 1) {
				$('.msg').fadeIn();
				setTimeout(function(){
					$('.msg').fadeOut();
				},500)
			}
		})

	// 提交电话号码,开始数钱
	var
		phonenum_obj = {},
		$money_block = $('.money_block'),
		$after_text = $('.after_text'),
		$submit_btn = $('.before_text button'),
		$submit_i = $('.before_text i'),
		phonenum,T,
		$phonenum = $('#phonenum');
	$submit_btn.click(function(){
		phonenum = $phonenum.val();
		if (/^1[3|4|5|8][0-9]\d{8}$/.test(phonenum)) {
			// 传送后台
			// phonenum_obj.url = '' + '?' + 'phonenum=' + phonenum;
			// phonenum_obj.type = 'GET';
			// $.ajax(phonenum_obj);
			$before_text.hide();
			window.scrollTo(0, 1);//摆正网页
			clearTimeout(T);
			function countdown () {
				clearTimeout(T);
				T = setTimeout(function(){
				true_num -= 1;
				if (true_num>0) {
					$settimeout.text(true_num + '.000');
				} else if (true_num==0) {
					$settimeout.text(true_num + '.000');
					$after_text.find('span:first-child').text($money_count.text());
					$after_text.show();
					clearTimeout(T)
				}
				countdown();
			},1000);
			}
			if (true_num == 0) {
				$settimeout.text('0.000');
				$after_text.find('span:first-child').text(0)
				$after_text.show();
			} else {
				countdown();
			}
		} else{
			$submit_i.text('请输入正确的手机号码');
		}
	})

	// 手机滑动事件
	var
		startY,
		endY,
		money_count = 0,
		$money_count = $('.money_count span');
	$money_block.on('touchstart',function(event){
		event.preventDefault();
		startY = event.originalEvent.changedTouches[0].pageY;
	})
	$money_block.on('touchend',function(event){
		event.preventDefault();
		endY = event.originalEvent.changedTouches[0].pageY;
		if ((startY-endY)>50) {
			money_count += 1;
			$money_count.text(money_count);
		}
	})

	// 重新挑战
	var $again_btn = $('.after_text button');
	$again_btn.click(function(){
		location.reload();
	})
})