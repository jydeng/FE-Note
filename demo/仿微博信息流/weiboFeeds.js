(function($) {
  var settings = {};
  var methods = {
    render: function(options) {
      settings = $.extend(
        {
          id: 'weiboFeeds' + '_' + methods._guid(),
          type: '',
          text: '请输入微博正文',
          imgs: [],
          cardTitle: '请输入Card标题',
          cardText: '请输入Card正文',
          cardBtn: ''
        },
        options
      );

      switch (settings.type) {
        case 'banner':
          methods._renderBanner.apply(
            this,
            Array.prototype.slice.call(arguments, 1)
          );
          break;
        case 'normal':
          methods._renderNormal.apply(
            this,
            Array.prototype.slice.call(arguments, 1)
          );
          break;
        case 'card':
          methods._renderCard.apply(
            this,
            Array.prototype.slice.call(arguments, 1)
          );
          break;
        default:
          console.error('请指定type! [banner|normal|card]');
          break;
      }
    },
    refresh: function(options) {
      settings = $.extend(
        {
          id: 'weiboFeeds' + '_' + methods._guid(),
          type: '',
          text: '请输入微博正文',
          imgs: [],
          cardTitle: '请输入Card标题',
          cardText: '请输入Card正文',
          cardBtn: ''
        },
        options
      );

      switch (settings.type) {
        case 'banner':
          methods._renderBanner.apply(
            this,
            Array.prototype.slice.call(arguments, 1)
          );
          break;
        case 'normal':
          methods._renderNormal.apply(
            this,
            Array.prototype.slice.call(arguments, 1)
          );
          break;
        case 'card':
          methods._renderCard.apply(
            this,
            Array.prototype.slice.call(arguments, 1)
          );
          break;
        default:
          console.error('请指定type! [banner|normal|card]');
          break;
      }
    },
    _renderNormal: function() {
      var html = `<div class="header"></div>
                                <div class="body">
                                    <div class="feedsHeader"></div>
                                    <div class="feedsContent">
                                        <div class="feedsText">
                                            ${settings.text}
                                        </div>
                                        <div class="feedsImg">
                                            ${methods._renderImgs(
                                              settings.imgs
                                            )}
                                        </div>
                                    </div>
                                    <div class="feedsFooter"></div>
                                </div>
                                <div class="footer"></div>`;

      return this.each(function() {
        var $this = $(this);

        $this.addClass('weiboFeeds');
        $this.addClass(settings.id);

        $this.html(html);
      });
    },
    _renderImgs: function(imgs) {
      var html = [];
      switch (imgs.length) {
        case 1:
        case 2:
          for (let i = 0; i < imgs.length; i++) {
            html.push(
              `<img class="item" height="100" width="100" src="${imgs[i]}" />`
            );
          }
          break;
        case 4:
          for (let i = 0; i < imgs.length; i++) {
            html.push(
              `<img class="item" height="100" width="100" src="${imgs[i]}" />`
            );
          }
          break;
        default:
          for (let i = 0; i < imgs.length; i++) {
            html.push(
              `<img class="item" height="70" width="70" src="${imgs[i]}" />`
            );
          }
          break;
      }
      return html;
    },
    _renderBanner: function() {
      var html = `<div class="header"></div>
                                <div class="body">
                                    <div class="feedsContent">
                                        <div class="feedsBanner">
                                            <div class="feedsBannerTilte">
                                                微博创作者广告共享计划
                                                <a class="feedsBannerClose">广告 X</a>
                                            </div>
                                            <img class="feedsBannerImg" src="${
                                              settings.imgs[0]
                                                ? settings.imgs[0]
                                                : ''
                                            }" />
                                        </div>
                                    </div>
                                </div>
                            <div class="footer"></div>`;

      return this.each(function() {
        var $this = $(this);

        $this.addClass('weiboFeeds');
        $this.addClass(settings.id);

        $this.html(html);
      });
    },
    _renderCard: function() {
      var html = ` <div class="header"></div>
                                    <div class="body">
                                        <div class="feedsHeader"></div>
                                        <div class="feedsContent">
                                            <div class="feedsText">
                                                ${settings.text}
                                            </div>
                                            <div class="feedsImg">
                                                <img class="cardImg" src="${
                                                  settings.imgs[0]
                                                    ? settings.imgs[0]
                                                    : ''
                                                }" />
                                            </div>
                                            <div class="feedsCard">
                                                <div class="feedsCardTitle">
                                                    ${settings.cardTitle}
                                                </div>
                                                <div class="feedsCardText">
                                                    ${settings.cardText}
                                                </div>
                                                ${
                                                  settings.cardBtn
                                                    ? `<a class="feedsCardBtn">${
                                                        settings.cardBtn
                                                      }</a>`
                                                    : ''
                                                }
                                            </div>
                                        </div>
                                        <div class="feedsFooter"></div>
                                    </div>
                                    <div class="footer"></div>`;

      return this.each(function() {
        var $this = $(this);

        $this.addClass('weiboFeeds');
        $this.addClass(settings.id);

        $this.html(html);
      });
    },
    _guid: function() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return (
        S4() +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        S4() +
        S4()
      );
    }
  };

  $.fn.WeiboFeeds = function(method) {
    if (methods[method]) {
      return methods[method].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method' + method + 'does not exist on jQuery.tooltip');
    }
  };
})(jQuery);
