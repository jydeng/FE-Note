(function ($) {
  var settings = {};

  var methods = {
      init: function (options) {
          settings = $.extend({
              id: 'Rsel-Container' + '_' + methods._guid(),
              timer: null,
              totalCount: 0,
              checkedCount: 0,
              leftTitle: '可选项',
              rightTitle: '已选项',
              data: [],
              checked: []
          }, options);

          return this.each(function () {
              var $this = $(this);

              $this.addClass(settings.id);
              $this.addClass('Rsel-Container');
              $this.html(
                '<div class="Rsel-left">' +
                  '<div style="height: 30px;line-height: 30px;padding-left: 15px;color: #666666;font-size: 13px;background: #eeeeee;border-bottom: 1px solid #ddd;">' +
                  settings.leftTitle +
                  "</div>" +
                  '<div class="search">' +
                  '<input class="searchInput" type="text" style="height: 25px;padding: 0 0 0 5px;width: calc(100% - 10px)!important;border: 1px solid #ddd;border-radius: 3px;font-size: 13px;color: #666666;">' +
                  "</div>" +
                  '<div class="wrapper">' +
                  '<div class="content">' +
                  "</div>" +
                  "</div>" +
                  '<div class="toolbar">' +
                  '共<span class="totalCount"></span>项' +
                  '<a class="checkAll">全选</a>' +
                  "</div>" +
                  "</div>" +
                  '<div class="Rsel-right">' +
                  '<div style="height: 30px;line-height: 30px;padding-left: 15px;color: #666666;font-size: 13px;background: #eeeeee;border-bottom: 1px solid #ddd;">' +
                  settings.rightTitle +
                  "</div>" +
                  '<div class="search">' +
                  '<input class="searchInput" type="text" style="height: 25px;padding:0 0 0 5px;width: calc(100% - 10px)!important;border: 1px solid #ddd;border-radius: 3px;font-size: 13px;color: #666666;">' +
                  "</div>" +
                  '<div class="wrapper">' +
                  '<div class="content">' +
                  "<ul>" +
                  "</ul>" +
                  "</div>" +
                  "</div>" +
                  '<div class="toolbar">' +
                  '已选<span class="checkedCount"></span>项' +
                  '<a class="clearBtn">反选</a>' +
                  "</div>" +
                  "</div>"
              );
              //渲染数据
              $this.find('.Rsel-left .content').html(methods._renderChild({ id: 'root', name: '' }, settings.data));

              //渲染总条数
              $this.find('.totalCount').html(settings.totalCount);

              //树展开事件
              $this.find('.Rsel-left').on('click', '.content>ul>li', function () {
                  var $this = $(this);
                  $this.toggleClass('ac');
              });

              //全选事件
              $this.find('.checkAll').on('click', function () {
                  $this.find('.Rsel-left .content li').each(function (index, ele) {
                      $(ele).find('.R-radio').eq(0).prop('checked', true)
                          .trigger('change');
                  });
                  methods._calcChecked();
              });

              //反选事件
              $this.find('.clearBtn').on('click', function () {
                  $this.find('.Rsel-right').find('ul').empty();
                  $this.find('.Rsel-left .content li').each(function (index, ele) {
                      $(ele).find('.R-radio').eq(0).prop('checked', false);
                  });
                  methods._calcChecked();
              });

              //搜索事件
              $this.find('.searchInput').on('input', function () {
                  if (settings.timer) clearTimeout(settings.timer);
                  that = this;
                  settings.timer = setTimeout(function () {
                      $(that).parent().parent().find('li').each(function (
                          index, elem) {
                          var $li = $(elem);
                          if (~$li.text().indexOf(that.value)) {
                              $(elem).show();
                          } else {
                              $(elem).hide();
                          }
                      });
                  }, 1000);
              });

              //点选事件
              $this.find('.Rsel-left').on('change', '.R-radio', function () {
                  var checked = this.checked,
                      $t = $(this),
                      $li = $t.parent().parent(),
                      $ul = $t.parent().parent().parent(),
                      allChecked = $ul.find('>li>.R-label>.R-radio:checked').length === $ul.find('>li>.R-label>.R-radio').length,
                      $child = $li.find('.R-radio');

                  if ($child.length) {
                      $child.prop('checked', checked);
                  }

                  //计算本级别所有项目是否选中，选中时需要触发事件，反选则不需要，避免副作用
                  if (allChecked) {
                      $ul.parent().find('>.R-label>.R-radio').eq(0).prop('checked', allChecked).trigger('change');
                  } else {
                      $ul.parent().find('>.R-label>.R-radio').eq(0).prop('checked', allChecked);
                      methods._calcChecked();
                  }

                  $this.find('.Rsel-right .content ul').empty();
                  $this.find('.Rsel-left .R-radio:checked').each(function (index, ele) {
                      var $ele = $(ele);
                      if ($ele.data('isparent')) {
                          if ($this.find('.Rsel-right .content ul [data-id="' + $ele.data('id') + '"]').length === 0) {
                              $this.find('.Rsel-right .content ul').append(
                                  '<li data-id="' +
                                  $ele.data('id') +
                                  '">' +
                                  ($ele.data('txt') || $ele.data('name')) +
                                  '<span class="Rsel-del">X</span></li>');
                          }
                      } else {
                          if ($this.find('.Rsel-right .content ul [data-id="' + $ele.data('id') + '"]').length === 0 && $this.find('.Rsel-right .content ul [data-id="' + $ele.data('parent') + '"]').length === 0) {
                              $this.find('.Rsel-right .content ul').append(
                                  '<li data-id="' +
                                  $ele.data('id') +
                                  '">' +
                                  ($ele.data('txt') || $ele.data('name')) +
                                  '<span class="Rsel-del">X</span></li>');
                          }
                      }
                  });

                  methods._calcChecked();
              });

              //加载已选中
              $(settings.checked).each(function (index, item) {
                  $this.find('.Rsel-left .content ul [data-id="' + item + '"]').prop(
                      'checked', true).trigger('change');
              });

              //删除按钮
              $this.find('.Rsel-right').on('click', '.Rsel-del', function () {
                  var $t = $(this),
                      $li = $t.parent();

                  $this.find('.Rsel-left .content [data-id="' +
                      $li.data('id') + '"]').prop('checked', false).trigger(
                          'change');
                  methods._calcChecked();
              });

              methods._calcChecked();
          });
      },
      getSelected: function () {
          var checkedItems = [];
          this.each(function (index, ele) {
              var $this = $(this);
              $this.find('.Rsel-right .content li').each(function (index, ele) {
                  var $ele = $(ele);
                  checkedItems.push({
                      id: $ele.data('id'),
                      name: $ele.text().replace('X', '')
                  });
              });
          });

          return checkedItems;
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

              html.push('<label class="R-label"><input class="R-radio" type="checkbox" data-id="' +
                  item.id + '" data-parent="' + parent.id + '" data-txt="' + (parent.name + ' ' + item.name) +
                  '" data-isparent="' + isparent +
                  '"><span class="R-checkbox R-radioInput"></span></label>');

              if (item.child !== undefined && item.child.length > 0) {
                  html.push(methods._renderChild(item, item.child))
              } else {
                  settings.totalCount++;
              }

              html.push('</li>');
          });
          return '<ul>' + html.join('') + '</ul>';
      },
      _calcChecked: function () {
          settings.checkedCount = $('.' + settings.id).find('.Rsel-right .content>ul>li').length;
          $('.' + settings.id).find('.checkedCount').html(settings.checkedCount);
      }
  };

  $.fn.Rsel = function (method) {
      if (methods[method]) {
          return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === 'object' || !method) {
          return methods.init.apply(this, arguments);
      } else {
          $.error('Method' + method + 'does not exist on jQuery.tooltip');
      }
  };
})(jQuery);