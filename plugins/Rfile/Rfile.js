(function($) {
  var Rfile = function(ele, opt) {
    (this.$element = ele),
      (this.defaults = {
        text: '点击上传', //显示文本
        className: 'Rfile', //外观
        multiple: false, //是否允许多选
        limitSize: 0, //允许文件大小,kb
        accept: [], //允许的后缀名
        width: 0, //允许的宽度,主要作用于图片
        height: 0, //允许的高度,主要作用于图片
        selected: null //默认选择
      }),
      (this.options = $.extend({}, this.defaults, opt));
  };

  var valid = function(files, options) {
    let allow = [],
      notallow = [];

    for (let i = 0; i < files.length; i++) {
      let f = files[i];

      if (options.limitSize > 0 && f.size > options.limitSize) {
        notallow.push({
          name: f.name,
          msg:
            '文件大小超过限制,允许的大小:${options.limitSize},实际大小:' +
            f.size +
            'KB'
        });
        continue;
      }

      if (
        options.accept.length > 0 &&
        options.accept.indexOf(f.name.split('.').pop()) === -1
      ) {
        notallow.push({
          name: f.name,
          msg:
            '文件类型不允许,允许的文件类型:' +
            options.accept.join(',') +
            ',实际文件类型:' +
            f.name.split('.').pop()
        });
        continue;
      }

      if (
        options.width > 0 &&
        options.height > 0 &&
        (options.width !== f.width || options.height !== f.height)
      ) {
        notallow.push({
          name: f.name,
          msg:
            '文件尺寸不匹配,要求的分辨率:' +
            options.width +
            '*' +
            options.height +
            ',实际尺寸:' +
            f.width +
            '*' +
            f.height
        });
        continue;
      }
      allow.push(f.data);
    }
    return [allow, notallow];
  };

  Rfile.prototype = {
    init: function() {
      //处理样式
      var that = this;
      var a = document.createElement('a');
      a.innerText = this.options.text;
      a.className = this.options.className;
      a.addEventListener('click', function() {
        that.$element.trigger('click');
      });
      this.$element.after(a);
      this.$element.css({
        visibility: 'hidden',
        width: 0,
        height: 0
      });

      if (this.options.multiple) {
        this.$element.attr('multiple', 'multiple');
      }

      if (this.options.accept.length) {
        this.$element.attr('accept', this.options.accept.join(','));
      }

      this.$element.on('change', function() {
        let allFiles = [],
          options = that.options;
        (loaded = 0), (files = this.files);

        for (let i = 0; i < files.length; i++) {
          let f = files[i];
          let size = Math.ceil(f.size / 1024);
          let name = f.name;
          let reader = new FileReader();
          try {
            reader.onload = function() {
              let data = this.result;
              let image = new Image();
              image.onload = function() {
                let width = image.width;
                let height = image.height;
                loaded++;
                allFiles.push({
                  size: size,
                  name: name,
                  width: width,
                  height: height,
                  data: data
                });

                //使用计数器,当所有图片加载完毕，调用验证方法
                if (loaded === files.length) {
                  if (typeof that.options.selected === 'function') {
                    that.options.selected.apply(this, valid(allFiles, options));
                    that.$element.val('');
                  }
                }
              };
              image.src = data;
            };
            reader.readAsDataURL(f);
          } catch (error) {
            console.error(error);
          }
        }
      });
    }
  };
  $.fn.Rfile = function(options) {
    var atom = new Rfile(this, options);
    return atom.init();
  };
})(jQuery);
