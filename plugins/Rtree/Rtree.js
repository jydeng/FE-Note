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
          title: '默认标题',
          searchPlaceholder: '请输入关键字搜索'
        },
        options
      );

      return this.each(function() {
        var $this = $(this);

        $this.addClass(settings.id);
        $this.addClass('Rtree-Container');

        //渲染基本结构
        $this.html(
          '<div class="title">' +
            settings.title +
            '</div>' +
            '<div class="search">' +
            '<input type="text" class="searchInput" placeholder="' +
            settings.searchPlaceholder +
            '">' +
            '</div>' +
            '<div class="wrapper">' +
            '<div class="content">' +
            '</div>' +
            '</div>' +
            '<div class="toolbar"></div>'
        );

        //渲染数据
        $this
          .find('.content')
          .html(methods._renderChild({ id: 'root', name: '' }, settings.data));

        //树展开事件
        $this.find('.content').on('click', 'li', function(e) {
          var $this = $(e.target);
          if ($this.hasClass('parent')) {
            $this.toggleClass('ac');
            return false;
          }
        });

        //选择事件
        $this.find('input[type="radio"]').on('change', function() {
          var result = {
            id: '',
            name: '',
            parents: []
          };
          var $item = $(this);
          result.id = $item.data('id');
          result.name = $item.data('name');
          $item.parents('li').each(function() {
            var $li = $(this);
            result.parents.push({
              id: $li.data('id'),
              name: $li.data('name')
            });
          });

          $this.find('.toolbar').html('已选择：' + result.name);
        });

        //搜索事件
        $this.find('.searchInput').on('input', function() {
          if (settings.timer) clearTimeout(settings.timer);
          that = this;
          settings.timer = setTimeout(function() {
            $(that)
              .parent()
              .parent()
              .find('li')
              .each(function(index, elem) {
                var $li = $(elem);
                if (~$li.text().indexOf(that.value)) {
                  $(elem).show();
                } else {
                  $(elem).hide();
                }
              });
          }, 1000);
        });

        //是否有默认选项
        if (settings.checked) {
          $this.find('.R-radio[data-id="' + settings.checked + '"]').click();
        }
      });
    },
    selected: function() {
      var result = {
        id: '',
        name: '',
        parents: []
      };
      this.each(function() {
        var $item = $(this).find(':checked');
        result.id = $item.data('id');
        result.name = $item.data('name');
        $item.parents('li').each(function() {
          var $li = $(this);
          result.parents.push({
            id: $li.data('id'),
            name: $li.data('name')
          });
        });
      });
      return result;
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
    },
    _renderChild: function(parent, data) {
      var html = [];
      $(data).each(function(index, item) {
        var isparent = item.child !== undefined && item.child.length > 0;

        html.push(
          '<li data-id="' +
            item.id +
            '" data-name="' +
            item.name +
            '"' +
            (isparent ? ' class="parent"' : 'class="child"') +
            '>' +
            item.name
        );

        if (!isparent) {
          html.push(
            '<label class="R-label">' +
              '<input class="R-radio" type="radio" name="R-radio" data-id="' +
              item.id +
              '" data-name="' +
              item.name +
              '">' +
              '<span class="R-radioInput"></span>' +
              '</label>'
          );
        }

        if (item.child !== undefined && item.child.length > 0) {
          html.push(methods._renderChild(item, item.child));
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
