var twitter_url = 'http://twitter.com/';
var api_url     = '/api/';
var setting_url = '/setting/';
var ext = '.json';

var method_list = {
	'home_timeline' : {
		'twurl' : '',
		'url' : 'statuses/home_timeline' + ext,
		'title' : 'timeline',
		'interval_time' : 60000
	},
	'user_timeline' : {
		'url' : 'statuses/user_timeline/%username%' + ext,
		'title' : 'user',
		'interval_time' : 300000
	},
	'mentions' : {
		'twurl' : '#replies',
		'url' : 'statuses/mentions' + ext,
		'title' : 'mentions',
		'interval_time' : 300000
	},
	'messages' : {
		'twurl' : '#inbox',
		'url' : 'direct_messages' + ext,
		'title' : 'dm',
		'interval_time' : 300000
	},
	'lists' : {
		'twurl' : '%username%/%list%',
		'url' : '%username%/lists/%list%/statuses' + ext,
		'title' : '%username%/%list%',
		'interval_time' : 300000
	},
	'search' : {
		'twurl' : 'search?q=%search%',
		'url' : 'search' + ext + '?q=%search%',
		'title' : '%search%',
		'interval_time' : 300000
	}
};

var setting = {
	'def' : { 'tab' : [ 'home_timeline', 'mentions' ] },
	'style': function(style) {
		setting.set['style'] = style;
		setting.save();
	},
	'add_tl' : function(tl_type) {
		for (i=0;i<setting.set['tab'].length;i++) {
			if (setting.set['tab'][i] == tl_type) {
				return false;
			}
		}
		setting.set['tab'].push(tl_type);
		setting.save();
	},
	'del_tl' : function(tl_type) {
		for (i=0;i<setting.set['tab'].length;i++) {
			if (setting.set['tab'][i] == tl_type) {
				delete setting.set['tab'][i];
			}
		}
		setting.save();
	},
	'save' : function() {
		var params = {
			'onetime_token' : onetime_token,
			'setting' : JSON.encode(setting.set)
		};
		$.getJSON('/setting/set', params, function(json) {
				if (json.ret == true) {
				} else if (json.ret == false) {
				}
				});
	},
	'destroy' : function() {
		var params = {
			'onetime_token' : onetime_token,
			'setting' : JSON.encode(setting.def)
		};
		$.getJSON('/setting/set', params, function(json){
				if (json.ret == true) {
				alert('destroy your setting. please reload this page.');
				} else if (json.ret == false) {
				}
				});
	}
};

var style_list = [
	{'filename':'ui-lightness','name':'UILightness'},
	{'filename':'ui-darkness' ,'name':'UIDarkness'},
	{'filename':'smoothness'  ,'name':'Smoothness'},
	{'filename':'start'       ,'name':'Start'},
	{'filename':'redmond'     ,'name':'Redmond'},
	{'filename':'sunny'       ,'name':'Sunny'},
	{'filename':'overcast'    ,'name':'Overcast'},
	{'filename':'le-frog'     ,'name':'LeFrog'},
	{'filename':'flick'       ,'name':'Flick'},
	{'filename':'pepper'      ,'name':'Pepper'},
	{'filename':'eggplant'    ,'name':'Eggplant'},
	{'filename':'dark-hive'   ,'name':'DarkHive'},
	{'filename':'cupertino'   ,'name':'Cupertino'},
	{'filename':'south-st'    ,'name':'SouthSt'},
	{'filename':'blitzer'     ,'name':'Blitzer'},
	{'filename':'humanity'    ,'name':'Humanity'},
	{'filename':'hot-sneaks'  ,'name':'HotSneaks'},
	{'filename':'excite-bike' ,'name':'ExciteBike'},
	{'filename':'vader-vader' ,'name':'VaderVader'},
	{'filename':'dot-luv'     ,'name':'DotLuv'},
	{'filename':'mint-choc'   ,'name':'MintChoc'},
	{'filename':'black-tie'   ,'name':'BlackTie'},
	{'filename':'trontastic'  ,'name':'Trontastic'},
	{'filename':'swanky-purse','name':'SwankyPurse'}
]

var tinyurl_list = [
	'.tk' , '1url.com' , '2pl.us' , '3.ly' , 'a.gd' , 'a.gg' , 'a.nf'
	, 'bit.ly' , 'bkite.com' , , 'bt.io' , , 'fa.by'
	, 'fav.me' , 'ff.im' , 'fff.to' , 'flic.kr' , 'gl.am'
	, 'goo.gl' , 'hex.io' , 'href.in' , 'icio.us' , 'is.gd' , 'j.mp'
	, 'kl.am' , , 'lru.jp' , 'lt.tl' , 'miniurl.com' , 'minurl.fr' , 'myurl.in'
	, 'nn.nf' , 'ow.ly' , 'pop.ly' , 'ri.ms'
	, 'short.ie' , 'short.to' , 'shoturl.us' , 'shrinkurl.us' , 'shrtl.com'
	, 'sn.im' , 'snipurl.com' , 'snurl.com' , 'su.pr' , 't.co' , 'tiny.cc' , 'tiny.pl' 
	, 'tinytw.it' , 'tinyurl.com' , 'tl.gd' , 'to.ly' , 'tr.im' , 'tr.my' //, 'tumblr.com'
	, 'tw1.us' , 'tw2.us' , 'tw5.us' , 'tw6.us' , 'tw8.us' , 'tw9.us' ,
	, 'twiturl.de' , 'twitzap.com' , 'twtr.us' , 'twurl.nl' , 'u.nu' , 'ub0.cc' , 'ur1.ca' , 'url.co.uk' , 'url.ie'
	, 'url4.eu' , 'ustre.am' , 'virl.com' , 'vl.am' , 'wa9.la' , 'wp.me' , 'x.se' , 'xav.cc'
	, 'xr.com' , 'xrl.in' , 'xrl.us' , 'xurl.jp' , 'yep.it' , 'yfrog.com' , 'zi.pe' , 'zz.gd'
	,'htn.to', 'p.tl', 'tobeto.be'
	];

	var imageurl_list = [
{
	'name' : 'twitpic',
		'func' : function(url) {
			var _url = url.split('/');
			var id = _url[_url.length - 1];
			return 'http://twitpic.com/show/thumb/' + id;
		}
}, {
	'name' : 'movapic',
		'func' : function(url) {
			// todo: support this url pattern
			// http://movapic.com/Hamachiya2/pic/2413540
			var _url = url.split('/');
			var id = _url[_url.length - 1];
			return 'http://image.movapic.com/pic/s_' + id + '.jpeg';
		}
}, {
	'name' : 'yfrog',
		'func' : function(url) {
			var _url = url.split('/');
			var id = _url[_url.length - 1];
			return 'http://yfrog.com/' + id + '.th.jpg'
		}
}, {
	'name' : 'gyazo',
		'func' : function(url) {
			return 'http://gyazo-thumbnail.appspot.com/thumbnail?url=' + url;
		}
}
];

var movieurl_list = [
{
	'name' : 'youtube',
		'func' : function(url) {
			var _url = url.split('v=');
			var id = _url[1];
			var ret = 
				'<object width="480" height="385"><param name="movie" value="http://www.youtube.com/v/%id%&amp;hl=en_US&amp;fs=1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/%id%&amp;hl=en_US&amp;fs=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="480" height="385"></embed></object>';
			return ret.replace(/%id%/g, id);
		}
}, {
	'name' : 'youtu.be',
		'func' : function(url) {
			var _url = url.split('/');
			var id = _url[3];
			var ret = 
				'<object width="480" height="385"><param name="movie" value="http://www.youtube.com/v/%id%&amp;hl=en_US&amp;fs=1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/%id%&amp;hl=en_US&amp;fs=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="480" height="385"></embed></object>';
			return ret.replace(/%id%/g, id);
		}
}
];

var twitterurl_list = [
{
	'name' : 'statuses',
		'regexp' : /https?:\/\/twitter\.com\/[a-z0-9_]+\/statu(s|ses)\/[0-9]+/i,
		'func' : function(url) {
			var _url = url.split('/');
			var username = _url[3];
			var status_id = _url[5];
			var tweet = search_tweet('id', status_id);
			if (tweet == false) {
				var params = { 'onetime_token' : onetime_token }
				$.getJSON('/api/statuses/show/' + status_id + '.json', params, function(json){params,display_statuses(json);});
			} else {
				display_statuses(tweet);
			}
		}
}, {
	'name' : 'lists',
		'regexp' : /https?:\/\/twitter\.com\/[a-z0-9_]+\/[a-z0-9_]+/i,
		'func' : function(url) {
			var _url = url.split('/');
			var username = _url[3];
			var list = _url[4];
			get_timeline('lists', username + '/' + list, true, true);
		}
}, {
	'name' : 'search',
		'regexp' : /https?:\/\/twitter\.com\/search?q=[^ Å@]+/i,
		'func' : function(url) {
			var _url = url.split('=');
			var word = _url[1];
			get_timeline('search', word, true, true);
		}
}, {
	'name' : 'user',
		'regexp' : /https?:\/\/twitter\.com\/[a-z0-9_]/i,
		'func' : function(url) {
			var _url = url.split('/');
			var username = _url[3];
			user_info(username);
		}
}
];

var dialog_width = 550;
var minWidth = 350;
var search = 0;

var thread = {};
var mine = {
	'id':'',
	'screen_name':'',
	'profile_image_url':''
}

var onetime_token = '';
var intervalTime = 60000; // milliseccond
var display_max = 50;
var s = { }
var s_default = {
	'count' : 200,
	'since_id' : 0,
	'old_since_id' : 0,
	'max_id' : 0,
	'page' : 0,
	'rpp' : 25}

	var tl_store = new Array();

	var msg = {
		'reply' : '[reply]',
		'rt' : '[RT]',
		'qt' : '[QT]',
		'fav' : '[fav]',
		'delfav' : '[delete fav]',
		'destroy' : '[destroy]'
	}

var zeroPadding = function(num, p) {
	return ('0' + num).slice(-p)
}

var create_id_from_tl = function(tl_type) {
	return CybozuLabs.MD5.calc(tl_type, CybozuLabs.MD5.BY_UTF16);
}

var create_id_from_target = function(target) {
	return target.split(' ')[0].split('#')[1];
}

var create_args_from_tl_type = function(tl_type) {
	var _tl_type = tl_type.split('/');
	var type = _tl_type[0];
	var words = '';
	if (_tl_type.length == 2) {
		words = _tl_type[1];
	} else if (_tl_type.length == 3) {
		words = _tl_type[1] + '/' + _tl_type[2];
	}
	return {'type': type, 'words': words};
}

var create_url_from_tl_type = function(tl_type) {
	var _tl_type = tl_type.split('/');
	var type = _tl_type[0];
	var ret = twitter_url + method_list[type]['twurl'];
	if (type == 'lists') {
		ret = ret.replace(/%username%/, _tl_type[1]).replace(/%list%/,_tl_type[2])
	} else if (type == 'search') {
		ret = ret.replace(/%search%/, _tl_type[1]).replace(/#/, '%23');
	}
	return ret;
}

var is_in_reply_to = function(in_reply_to) {
	if (in_reply_to == null) {
		return false;
	} else {
		return true;
	}
}

var is_true = function(v) { return v ? true : false; }
var is_false = function(v) { return v ? false : true; }
var is_mine = function(v) { return v == mine['screen_name'] ? true : false; }
var is_append = function(v) { return v == 'append' ? true : false;};
var is_prepend = function(v) { return v == 'prepend' ? true : false;};

var adjust_meta_click = function(_this) {
	return false;
	//if ($(_this).parent().siblings('.meta').css('display') == 'block') {
	//	$(_this).siblings('.meta').hide();
	//} else {
	//	$(_this).siblings('.meta').show();
	//}
}

var auto_link_user = function(text) {
	return text.replace(/@([a-z0-9_]{1,15})/ig, '<a href="'+twitter_url+'$1" onclick="adjust_meta_click(this); user(this); return false;">@$1</a>');
}

var auto_link = function(text) {
	return text
		.replace(/(https?:\/\/[a-z0-9~!@#$%^&*_,+=\-\/\.\?]*)/ig, "<a href='$1' target='_blank' onclick=\"adjust_meta_click(this); link_click(this,'$1'); return false;\">$1</a>")
		.replace(/([\s]|^)(#[a-zA-Z0-9_\-]+)/ig, " <a href='http://twitter.com/search?q=$2' onclick=\"adjust_meta_click(this); get_timeline('search', '$2', true, true); return false;\">$2</a>")
		.replace(/q=#/, "q=%23");
}

var link_click = function(_this, url) {
	for (i=0; i<movieurl_list.length; i++) {
		if (url.indexOf(movieurl_list[i]['name']) > 0) {
			display_movie(_this, url, movieurl_list[i]['func'](url));
			return false;
		}
	}
	for (i=0; i<imageurl_list.length; i++) {
		if (url.indexOf(imageurl_list[i]['name']) > 0) {
			display_image(_this, url, imageurl_list[i]['func'](url));
			return false;
		}
	}
	for (i=0; i<tinyurl_list.length; i++) {
		if (url.indexOf('://' + tinyurl_list[i]) > 0) {
			display_tinyurl(_this, url);
			return false;
		}
	}
	for (i=0; i<twitterurl_list.length; i++) {
		if (url.match(twitterurl_list[i]['regexp']) != null) {
			twitterurl_list[i]['func'](url);
			return false;
		}
	}

	window.open(url);
}

var display_tinyurl = function(_this, url) {
	// http://python.g.hatena.ne.jp/edvakf/20090218/1234945800
	var params = {'url':url, 'callback':'cb'}
	var html = $(_this).parent().html();
	$.ajax({
url : 'http://atsushaa.appspot.com/untiny/get',
data : params,
dataType : 'jsonp',
complete : function(json) {},
success : function(json) {
if (typeof(json[url]) != 'undefined') {
var tinyurl = json[url];
$(_this).parent().html(html.split(url).join(tinyurl));
}
}
});
}

var display_movie = function(_this, url, html) {
	var article_id = $(_this).parent().siblings('input.article_id').val();
	var target = '#' + article_id + ' > .contents';
	$(target).html(html)
}

var display_image = function(_this, url, image_url) {
	var article_id = $(_this).parent().siblings('input.article_id').val();
	var target = '#' + article_id + ' > .contents';
	var html = '<p style="text-align:left;"><a href="'+url+'" target="_blank"><img src="'+image_url+'"></a>';
	$(target).html(html)
}

var make_tweets_html = function(target, data, type) {
	var article_id = create_id_from_tl(target) + '-' + data.id_str;
	var created_at = new Date(data.created_at);
	var datetime = zeroPadding(created_at.getMonth() + 1, 2)
		+ '/' + zeroPadding(created_at.getDate(), 2)
		+ '/' + created_at.getFullYear()
		+ ' ' + zeroPadding(created_at.getHours(), 2)
		+ ':' + zeroPadding(created_at.getMinutes(), 2)
		+ ':' + zeroPadding(created_at.getSeconds(), 2)

	var convert_source = function(source) {
		return source.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/">/,'" target="_blank">');
	}

	if (is_prepend(type)) {
		$(target).prepend('<article class="tweet" id="'+article_id+'"></article>');
		_target = target + ' :first';
	}
	if (is_append(type)) {
		$(target).append('<article class="tweet" id="'+article_id+'"></article>');
		_target = target + ' :last';
	}

	if (typeof(data.user) == 'undefined') {
		var screen_name = data.from_user;
		var profile_image_url = data.profile_image_url;
	} else {
		var screen_name = data.user.screen_name
			var profile_image_url = data.user.profile_image_url;
	}

	$(_target)
		.html('<input type="hidden" class="id" value="'+data.id_str+'">'
				+ '<input type="hidden" class="article_id" value="'+article_id+'">'
				+ '<input type="hidden" class="screen_name" value="'+screen_name+'">'
				+ '<img class="profile_image" src="'+profile_image_url+'">'
				+ '<span class="screen_name"><a href = "'+twitter_url + screen_name+'" onclick="user(this); return false;">' + screen_name+'</a></span>')
		.append($('<span class="text">' + auto_link_user(auto_link(data.text)) + '</span>').toggle(
					function(){$(this).siblings('.meta').show()},
					function(){$(this).siblings('.meta').hide()}
					))
		.append($('<section class="contents">'))
		.append($('<ul class="meta">')
				.html('<li><span class="datetime"><a href="http://twitter.com/'+screen_name+'/status/'+data.id_str+'" target="_blank">'+datetime+'</a></span></li><li><span class="source">via ' + convert_source(data.source) + '</span></li>')
				.iff(is_in_reply_to, data.in_reply_to_status_id)
				.append('<li><span class="in_reply_to"><a href="' + twitter_url + data.in_reply_to_screen_name + '/status/' + data.in_reply_to_status_id_str+ '" onclick="in_reply_to(this); return false;">in reply to ' + data.in_reply_to_screen_name + '</a></li>').end()
				.append('<li><a href="#" onclick="reply(this); return false;">'+msg['reply']+'</a></li>'
					+ '<li><a href="#" onclick="quoted_tweet(this); return false;">'+msg['qt']+'</a></li>'
					+ '<li><a href="#" onclick="re_tweet(this); return false;">'+msg['rt']+'</a></li>')
				.iff(is_true, data.favorited)
				.append('<li><a href="#" onclick="favorite(this);return false;">'+msg['delfav']+'</a></li>').end()
				.iff(is_false, data.favorited)
				.append('<li><a href="#" onclick="favorite(this);return false;">'+msg['fav']+'</a></li>').end()
				.iff(is_mine, screen_name)
				.append('<li><a href="#" onclick="destroy(this);return false;">'+msg['destroy']+'</a></li>').end()
			   )
		.append($('<section class="in_reply_to_box">')
		.append($('<section class="in_reply_to_tweets">')))
		;
}

var display_timeline = function(tl_type, focus_flg) {
	var oid = create_id_from_tl(tl_type);
	var cid = '#' + oid;
	if ($(cid).length == 0) {
		var url = create_url_from_tl_type(tl_type);
		var html = '<section id="'+oid+'" class="timeline" style="display:none">';
		html += ''
			+ '<section class="ui-widget-content">'
			+ '<section class="tweets-wrapper">'
			+ '<section class="tweets-header"><a href="#" onclick="reload_timeline(\''+tl_type+'\');return false;">reload</a> <a href="#" onclick="del_timeline(\''+tl_type+'\');return false;">close</a> <a href="'+url+'" target="_blank">'+url+'</a></section>'
			+ '<section class="tweets"></section>'
			+ '</section>';
		+ '</section>';
		$('body').append(html);
		if (tl_type == 'home_timeline') {
			$("#tab").tabs("add",cid,tl_type,1);
		} else if (tl_type == 'mentions') {
			$("#tab").tabs("add",cid,tl_type,2);
		} else {
			$("#tab").tabs("add",cid,tl_type);
		}
		if (focus_flg) {
			if (tl_type == 'home_timeline') {
				$($("#tablist li a")[1]).click();
			} else {
				$("#tablist li:last a").click();
			}
		}
		$(cid).css("display","block");
	}
	var tl = tl_store[tl_type];
	tl = tl.slice(tl.length - display_max, tl.length);
	for (i=0;i<tl.length;i++) {
		if (tl[i] != null && tl[i].id <= s[tl_type]['old_since_id']) {
			continue;
		}
		if ($(cid + ' article').length >= display_max) $(cid + ' article:last-child').remove()
			make_tweets_html(cid + ' .tweets' , tl[i], 'prepend')
	}
}

var get_subscriptions_lists = function(username) {
	var url = api_url + username + '/lists/subscriptions' + ext;
	var params = { 'onetime_token' : onetime_token };
	$.getJSON(url, params, function(json) {
			var lists = new Array();
			for (i in json.lists) {
				lists.push({
					'name' : json.lists[i].name,
					'full_name' : json.lists[i].full_name,
					'uri' : json.lists[i].uri,
					'user' : json.lists[i].user.screen_name,
					});
			}

			var html = '<ul class="lists">';
			for (i in lists) {
				html += '<li><a href="#" onclick="get_timeline(\'lists\', \''+lists[i]['user'] + '/' + lists[i]['name'] + '\',true,true); return false;">' + lists[i]['user'] + '/' + lists[i]['name'] + '</a></li>';
				}
				html += '</ul>';
				$('#add-tl').append(html)
				$('#get-lists').remove();
			});
}

var del_timeline = function(tl_type) {
	var oid = create_id_from_tl(tl_type);
	var cid = '#' + oid;
	clearTimeout(s[tl_type]['id']);
	delete thread[tl_type];
	delete s[tl_type];
	delete tl_store[tl_type];
	var removetab = function(id) {
		var obj = $(id + ' ul:first li');
		for (i=0; i<obj.length; i++) {
			if (obj[i].className.indexOf('ui-state-active') > 0) {
				$(id).tabs('remove', i);
				return true;
			}
		}
	}
	setting.del_tl(tl_type);
	removetab('#tab');
}

var reload_timeline = function(tl_type) {
	var oid = create_id_from_tl(tl_type);
	var cid = '#' + oid;
	if (tl_type.indexOf('/') > 0) {
		_tl_type = tl_type.split('/');
		type = _tl_type.shift();
		words = _tl_type.join('/');
	} else {
		type = tl_type;
		words = '';
	}
	clearTimeout(s[tl_type]['id']);
	get_timeline(type,words,false,false);
}

var user_info = function(screen_name) {
	var params = { 'onetime_token' : onetime_token }
	var oid = create_id_from_tl(screen_name);
	var cid = '#' + create_id_from_tl(screen_name);
	if ($(cid).length > 0) {
		$(cid).remove();
	}
	$.getJSON('/api/statuses/user_timeline/' + screen_name + '.json', params ,
		function(json){
			if (screen_name != mine['screen_name']) {
				var params = {
					'onetime_token' : onetime_token,
					'target_screen_name' : screen_name,
					'source_screen_name' : mine['screen_name']
				}
				$.getJSON('/api/friendships/show.json', params, function(json){
					var html_following = '';
					var html_follow_action = '';
					if (json.relationship.target.following == true) {
						html_following += screen_name + ' is following you';
					} else if (json.relationship.target.following == false) {
						html_following += screen_name + ' is not following you';
					}
					if (json.relationship.source.following == true) {
						html_follow_action += '<button onclick="user_remove(\''+screen_name+'\');">remove</button>';
					} else if (json.relationship.source.following == false) {
						html_follow_action += '<button onclick="user_follow(\''+screen_name+'\');">follow</button>';
					}
					$(cid + ' .following').html(html_following);
					$(cid + ' .follow-action').html(html_follow_action);
					});
			}

			var user_info = json[0].user;
			var html = '<img src="'+user_info.profile_image_url+'" class="profile_image"><ul class="profile">';
			if (user_info.location != null) {
				html += '<li>Location:' + user_info.location + '</li>';
			}
			if (user_info.url != null) {
				html += '<li>url:<a href="' + user_info.url + '">' + user_info.url + '</a></li>';
			}
			if (user_info.description != null) {
				html += '<li>Bio:' + user_info.description + '</li>';
			}
			//+ '<li>following:' + user_info.following + '</li>'
			html +=
			'<li><a href="http://twitter.com/' + user_info.screen_name + '/following" target="_blank">following:' + user_info.friends_count + '</a>'
			+ ' / <a href="http://twitter.com/' + user_info.screen_name + '/followers" target="_blank">followers:' + user_info.followers_count + '</a>'
			+ ' / <a href="http://twitter.com/' + user_info.screen_name + '/lists/memberships" target="_blank">listed:' + user_info.listed_count + '</a>'
			+ ' / <a href="http://twitter.com/' + user_info.screen_name + '" target="_blank">tweets:' + user_info.statuses_count + '</a></li>'
			+ '<li class="following"></li>'
			+ '<li class="follow-action"></li>'
			+ '</ul>'
			+ '<section class="tweets-wrapper">'
			+ '<section class="tweets-header"></section>'
			+ '<section class="tweets"></section>'
			+ '</section>'

			$('<section id="'+oid+'" class="user_info">').html(html)
				.dialog({title:user_info.screen_name + '/' + user_info.name,width:dialog_width,height:300,position:'center'}) ;
			tl_store[screen_name] = new Array();
			json.reverse();
			for (i=0;i<json.length;i++) {
				tl_store[screen_name].push(json[i])
					make_tweets_html(cid + ' .tweets', json[i], 'prepend');
			}
		});
}

var user = function(_this) {
	var _url = ($(_this).attr('href')).split('/');
	var screen_name = _url[_url.length-1];
	user_info(screen_name);
}

var search_tweet = function(key, val) {
	for (i in tl_store) {
		for (j=0;j<tl_store[i].length; j++) {
			if (tl_store[i][j] != null && tl_store[i][j][key] == val) {
				return tl_store[i][j];
			}
		}
	}
	return false;
}

var get_in_reply_to = function(target, _json) {
	var tweet = search_tweet('id', _json.in_reply_to_status_id_str);
	var params = { 'onetime_token' : onetime_token }
	if (typeof(tweet) == 'boolean') {
		if (_json.in_reply_to_status_id == null) {
			return false;
		}
		$.getJSON('/api/statuses/show/' + _json.in_reply_to_status_id_str + '.json', params,
				function(json) {
					if (typeof(json.error) != 'undefined') {
						return false;
					}
					make_tweets_html(target, json, 'append');
					get_in_reply_to(target, json);
				});
	} else {
		make_tweets_html(target, tweet, 'append');
		get_in_reply_to(target, tweet);
	}
};

var in_reply_to = function(_this) {
	var root_tweet = search_tweet('id', $(_this).closest('ul').siblings('input.id').val());
	var article_id = $(_this).closest('ul').siblings('input.article_id').val();
	var target = '#' + article_id + ' > .in_reply_to_box > .in_reply_to_tweets';
	if ($(target).length > 0) {
		$(target).html('');
	}
	//$('<section id="in-reply-to" class="ui-draggable user_info"><section class="tweets"></section></section>')
	//	.dialog({'title':'reply','width':dialog_width});
	get_in_reply_to(target, root_tweet);
	return false;
}

var display_statuses = function(data) {
	if (typeof(data.error) != 'undefined') {
		return false;
	}
	var oid = create_id_from_tl(data.id_str);
	var cid = '#' + oid;
	$('<section id="'+oid+'" class="statuses"><section class="tweets"></section></section>')
		.dialog({'title':'tweet','width':dialog_width});
	make_tweets_html(cid + ' .tweets' , data, 'append')
}

var reply = function(_this) {
	$('#update .status').val('@' + $(_this).closest('ul').siblings('input.screen_name').val());
	$('#update .in_reply_to_status_id').val($(_this).closest('ul').siblings('input.id').val());
}

var quoted_tweet = function(_this) {
	$('#update .status').val('QT @' + $(_this).closest('ul').siblings('input.screen_name').val() + ' ' + $(_this).closest('ul').siblings('span.text').text());
	$('#update .in_reply_to_status_id').val('');
}

var get_timeline = function(type, words, first_flg, focus_flg) {
	var tl_type = type;
	var url = api_url + method_list[type]['url'];

	if (words == '') {
		// pass
	} else if (typeof(words) == 'string') {
		tl_type += '/' + words;
		if (type == 'lists') {
			if (words.indexOf('/') == -1) {
				return false;
			}
			_words = words.split('/')
				url = url.replace(/%username%/, _words[0]).replace(/%list%/,_words[1]);
		}
		if (type == 'search') {
			url = url.replace(/%search%/, words).replace(/#/, '%23');
		}
	} else {
		return false;
	}

	if (first_flg) {
		if (typeof(thread[tl_type]) != 'undefined' && thread[tl_type] == true) {
			return false;
		}
	} else {
		if (typeof(thread[tl_type]) != 'undefined' && thread[tl_type] == false) {
			return false;
		}
	}
	thread[tl_type] = true;

	if(typeof(s[tl_type]) == 'undefined') {
		s[tl_type] = new Array();
		for (i in s_default) {
			s[tl_type][i] = s_default[i];
		}
	}
	if(typeof(tl_store[tl_type]) == 'undefined') {
		tl_store[tl_type] = new Array();
	}

	var params = {
		'onetime_token' : onetime_token,
		'count'    : s[tl_type]['count']
	}
	if (type != 'search') {
		params['page'] = s[tl_type]['page'];
	}
	if (type == 'search') {
		params['rpp'] = s[tl_type]['rpp'];
	}
	// why list api returned error when since_id is 0 ?
	if (s[tl_type]['since_id'] != 0) {
		params['since_id'] = s[tl_type]['since_id'];
	} else {
		//params['since_id'] = 0;
	}

	$.getJSON(url, params , function(json){
				if (type == 'search') {
					json = json['results'];
				}
				if (json.length > 0) {
					s[tl_type]['old_since_id'] = s[tl_type]['since_id'];
					s[tl_type]['since_id'] = json[0].id;
				} else {
					return false;
				}
				json.reverse();
				for (i=0;i<json.length;i++) {
					tl_store[tl_type].push(json[i])
				}
				display_timeline(tl_type, focus_flg);
				if (first_flg) {
					setting.add_tl(tl_type);
					layout();
				}
			});
	s[tl_type]['id'] = setTimeout("get_timeline('"+type+"','"+words+"', false, false)", method_list[type]['interval_time']);
}

var word_count = {
	'id' : null,
	'run' : function() {
		$('#word_count').html($('#update .status')[0].value.length);
	}
}

var update = function(){
	$('#update .status').focus(function(){
			word_count['id'] = setInterval("word_count['run']()",500);
			});
	$('#update .status').blur(function(){
			clearTimeout(word_count['id']);
			});
	$('#update .submit').click(function(){
			$.post('/api/statuses/update.json', {
				'onetime_token' : onetime_token,
				'status' : $('#update .status')[0].value,
				'in_reply_to_status_id' : $('#update .in_reply_to_status_id')[0].value
				}, function(json) {
					if (typeof(json.error) == 'undefined') {
						$('#update .status').val('');
						$('#update .in_reply_to_status_id').val('');
						$('#word_count').html('0');
					} else {
						alert('update error');
					}
					reload_timeline('home_timeline');
				},'json');
			return false;
			});
}

var destroy = function(_this) {
	var id = $(_this).closest('ul').siblings('input.id').val();
	if (confirm('destroy?')) {
		$.post('/api/statuses/destroy/'+id+'.json', { 'onetime_token' : onetime_token },
				function(json){
				$(_this).closest('article').remove();
				},'json');
	} else {
		alert('cansel destroy');
	}
	return false;
}

var re_tweet = function(_this) {
	var id = $(_this).closest('ul').siblings('input.id').val();
	if (confirm('retweet?')) {
		$.post('/api/statuses/retweet/'+id+'.json', { 'onetime_token' : onetime_token });
	} else {
		alert('cansel retweet');
	}
	return false;
}

var favorite = function(_this) {
	var id = $(_this).closest('ul').siblings('input.id').val();
	var flg = $(_this).text() == msg['fav'] ? false : true;
	var url = '';
	var msg_conf = '';
	var msg_cansel = '';
	if (flg) {
		msg_conf = 'destroy favorite?';
		msg_cansel = 'canseled';
		url = '/api/favorites/destroy/' + id + '.json';
	} else {
		msg_conf = 'make favorite?';
		msg_cansel = 'canseled';
		var url = '/api/favorites/create/' + id + '.json'
	}
	if (confirm(msg_conf)) {
		$.post(url, { 'onetime_token' : onetime_token }, 
				function(json) {
				if (typeof(json.favorited) == 'boolean') {
					if (json.favorited == true) {
					_msg = msg['delfav'];
					} else {
					_msg = msg['fav'];
					}
					$(_this).text(_msg);
				} else if (typeof(json.error) == 'string') {
					alert(json.error);
				}
				}, 'json');
	} else {
		alert(msg_cansel);
	}
	return false;
};

var user_follow = function(screen_name) {
	var params = {
		'onetime_token' : onetime_token,
		'screen_name' : screen_name
	};
	var url = '/api/friendships/create.json';
	if (confirm('follow this user?')) {
		$.post(url, params, function(json) {
			html_follow_action = '<button onclick="user_remove(\''+screen_name+'\');">remove</button>';
			var cid = '#' + create_id_from_tl(screen_name);
			$(cid + ' .follow-action').html(html_follow_action);
		}, 'json');
	}
}

var user_remove = function(screen_name) {
	var params = {
		'onetime_token' : onetime_token,
		'screen_name' : screen_name
	};
	var url = '/api/friendships/destroy.json';
	if (confirm('remove this user?')) {
		$.post(url, params, function(json) {
			html_follow_action = '<button onclick="user_follow(\''+screen_name+'\');">follow</button>';
			var cid = '#' + create_id_from_tl(screen_name);
			$(cid + ' .follow-action').html(html_follow_action);
		}, 'json');
	}
}

var get_user_info = function() {
	$('#user-button').click(function(){
			var words = $('#user-words').val();
			user_info(words);
			});
}

var search = function() {
	$('#search-button').click(function(){
			var words = $('#search-words').val();
			get_timeline('search', words, true, true);
			});
}

var lists = function() {
	$('#lists-button').click(function(){
			var words = $('#lists-words').val();
			get_timeline('lists', words, true, true);
			});
}

var user_init = function() {
	$.getJSON('/api/account/verify_credentials.json',{'onetime_token':onetime_token},
			function(json) {
				mine['id'] = json.id;
				mine['screen_name'] = json.screen_name;
				mine['profile_image_url'] = json.profile_image_url;
				$('#mine_icon').attr('src',mine['profile_image_url']);
				$('#add-tl').append('<button id="get-lists" onclick="get_subscriptions_lists(\''+mine['screen_name']+'\')">get your subscriptions lists</button>');
				setting_init();
				}
			)
};

var setting_init = function() {
	if (setting.set == '') {
		setting.set = setting.def;
	}
	for (i in setting.set['tab']) {
		var t = create_args_from_tl_type(setting.set['tab'][i]);
		var first_flg = true;
		var focus_flg = false;
		if (t['type'] == 'home_timeline') {
			focus_flg = true;
		}
		get_timeline(t['type'], t['words'], first_flg, focus_flg);
	}
}

var layout = function() {
	var height = $(window).height() - $('header#header').outerHeight(true) - 10;
	$('#timelines').height(height);
	var title_bar_height = $('#tablist').outerHeight(true);
	$('.timeline').height(height - title_bar_height);
	$('#timelines .tweets-wrapper').height(height - title_bar_height);
}

var style_list_set = function() {
	var html = '<label for="style-changer">Style Select </label><select name="style-changer" id="style-changer">';
	var selected = '';
	var style = 'ui-lightness';
	for (var i=0; i<style_list.length; i++) {
		if (typeof setting.set['style'] != 'undefined' && style_list[i]['filename'] == setting.set['style']) {
			selected = ' selected';
			style = setting.set['style'];
		} else {
			selected = '';
		}
		html += '<option value="'+style_list[i]['filename']+'"'+selected+'>'+style_list[i]['name']+'</option>';
	}
	html += '</input>';
	$('#style-select').html(html);

	var style_html = '<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/%style%/jquery-ui.css" type="text/css"><link rel="stylesheet" href="/css/adjust_jquery_ui.css" type="text/css">';
	$('#style-changer').change(function(){
		style = $('#style-changer').val()
		$('head').append(style_html.replace('%style%', style));
		style_adjust();
		setting.style(style);
		setTimeout(style_adjust,1000);
	});
	$('head').append(style_html.replace('%style%', style));
	setTimeout(style_adjust,1000);
}

var style_adjust = function() {
	var b_color = $('.ui-widget-content').css('background-color');
	var f_color = $('.ui-widget-content').css('color');
	var css = {
		'background-color' : b_color,
		'color' : f_color
	}
	$('textarea').css(css);
	$('input').css(css);
	$('body').css(css);
}
