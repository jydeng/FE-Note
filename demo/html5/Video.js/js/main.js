(function() {
  var player = videojs(
    'roomVideo',
    {
      width: window.screen.width,
      height: window.screen.height * 0.4,
      language: 'zh-CN'
    },
    function() {
      this.on('loadedmetadata', function() {
        //加载到元数据后开始播放视频
        console.log('loadedmetadata');
      });

      this.on('ended', function() {
        console.log('ended');
      });

      this.on('firstplay', function() {
        console.log('firstplay');
      });

      this.on('loadstart', function() {
        //开始加载
        console.log('loadstart');
      });

      this.on('loadeddata', function() {
        console.log('loadeddata');
      });

      this.on('seeking', function() {
        //正在去拿视频流的路上
        console.log('seeking');
      });

      this.on('seeked', function() {
        //已经拿到视频流,可以播放
        console.log('seeked');
      });

      this.on('waiting', function() {
        console.log('waiting');
      });

      this.on('pause', function() {
        console.log('pause');
      });

      this.on('play', function() {
        console.log('play');
      });
    }
  );

  // 标题切换
  $('.tabs li').on('click', function() {
    var $item = $(this);
    if (!$item.hasClass('active')) {
      $('.tabs .active').removeClass('active');
      $item.addClass('active');

      $('.part.active').removeClass('active');
      $($item.data('target')).addClass('active');
    }
  });

  // 评论滚动事件
  function scroll() {
    var scrollTop = $('#discuss').scrollTop();
    if (scrollTop > 0) {
      $('.loading').show();
    } else {
      $('.loading').hide();
    }
  }

  // 加载标志，防止多次点击
  var isloading = false;

  // 点击加载更多
  $('#discuss .loading').on('click', function() {
    if(isloading) return false;

    isloading = true;
    $('#discuss .loading').html('用力加载中...');
    $.get('./img/data.json', function(json) {
      var html = [];
      var tpl =
        '<div class="item">' +
        '<img class="header" src="./img/header.jpg" />' +
        '<div class="content">' +
        '<div class="name">{{name}}</div>' +
        '<div class="text">{{text}}</div>' +
        '<div class="time">{{time}}</div>' +
        '</div>' +
        '<div class="action">' +
        '<a>点赞</a>' +
        '<a>回复</a>' +
        '</div>' +
        '</div>';

      for (var index = 0; index < json.discuss.length; index++) {
        var item = json.discuss[index];
        html.push(Mustache.render(tpl, item));
      }
      $('#discuss .loading').html('点击加载更多......');
      $('#discuss .loading').before(html.join(''))
      isloading = false;
    });
  });

  $('#discuss').on('scroll',scroll).trigger('scroll');

})();
