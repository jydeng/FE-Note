(function($) {
  var settings = {};

  var methods = {
    init: function(options) {
      settings = $.extend(
        {
          id: 'Rtree-Container' + '_' + methods._guid(),
          timer: null,
          data: [],
          checked: null,
          title: '默认标题'
        },
        options
      );

      return this.each(function(){
        var $this = $(this);

        $this.addClass(settings.id);
        $this.addClass('Rtree-Container');

        //渲染基本结构
        $this.html(
          '<div class="title">'+settings.title+'</div>'+
          '<div class="search">' +
          '<input type="text" class="searchInput">' +
          '</div>' +
          '<div class="content"></div>'+
          '<div class="toolbar"></div>'
        );

        //渲染数据
        $this.find('.content').html(methods._renderChild({ id: 'root', name: '' }, settings.data));

        //树展开事件
        $this.find('.content').on('click', 'ul>li', function () {
            var $this = $(this);
            $this.toggleClass('ac');
        });

      });
    },
    _guid: function () {
      function S4() {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    },
    _renderChild: function (parent, data) {
      var html = [];
      $(data).each(function (index, item) {
          var isparent = item.child !== undefined && item.child.length > 0;

          html.push('<li>' + item.name + (isparent ? ' [+]' : ''));

          if(!isparent){
            html.push('<label class="R-label">'+
            '<input class="R-radio" type="radio" name="R-radio">'+
            '<span class="R-radioInput"></span>'+
          '</label>');
          }

          if (item.child !== undefined && item.child.length > 0) {
              html.push(methods._renderChild(item, item.child))
          } else {
              settings.totalCount++;
          }

          html.push('</li>');
      });
      return '<ul>' + html.join('') + '</ul>';
    }
  };

  $.fn.Rtree = function(method) {
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
