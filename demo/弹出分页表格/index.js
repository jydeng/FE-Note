(function() {
  var wrapper = "#dmpSelect ";
  var url = "http://douyin.vedamobi.com/dsp/dydmp/getbag";
  var page = 1;
  var total = 0;
  var id = "";

  var loadData = function(name) {
    $.ajax({
      url: url,
      data: {
        name: name,
        page: page
      },
      dataType: "jsonp"
    }).then(function(res) {
      var html = [];

      if (res.total) {
        total = res.total;
        if (page === 1) {
          $(wrapper + ".prev-btn").addClass("disabled");
          if (res.total > 10) {
            $(wrapper + ".next-btn").removeClass("disabled");
          } else {
            $(wrapper + ".next-btn").addClass("disabled");
          }
        }
      } else {
        $(wrapper + ".prev-btn").addClass("disabled");
        $(wrapper + ".next-btn").addClass("disabled");
      }

      $(res.result).each(function(index, item) {
        html.push(
          "<li data-id=" +
            item.dmpid +
            " data-name=" +
            item.name +
            ">" +
            item.name +
            "</li>"
        );
      });

      $(wrapper + ".Rtable-data").html(html.join(""));
      $(wrapper + ".confirm-btn").hide();
      id = "";
    });
  };

  var search = function() {
    var name = $(wrapper + ".input-name")
      .val()
      .trim();

    page = 1;
    loadData(name);
  };
  var nextPage = function() {
    var name = $(wrapper + ".input-name")
      .val()
      .trim();

    if (page * 10 < total) {
      page += 1;
      loadData(name);
      $(wrapper + ".prev-btn").removeClass("disabled");
    }

    if (page * 10 >= total) {
      $(wrapper + ".next-btn").addClass("disabled");
    }
  };
  var prevPage = function() {
    var name = $(wrapper + ".input-name")
      .val()
      .trim();

    if (page > 1) {
      page -= 1;
      loadData(name);
      $(wrapper + ".next-btn").removeClass("disabled");
    }

    if (page === 1) {
      $(wrapper + ".prev-btn").addClass("disabled");
    }
  };
  var confirm = function() {
    close();
  };
  var close = function() {
    $(".Rtable-mask").hide();
    $(wrapper).hide();
  };

  $(wrapper + ".prev-btn").on("click", prevPage);
  $(wrapper + ".next-btn").on("click", nextPage);
  $(wrapper + ".confirm-btn").on("click", confirm);
  $(wrapper + ".Rtable-close").on("click", close);
  $(wrapper + ".search-btn").on("click", search);
  $(wrapper + ".Rtable-data").on("click", "li", function() {
    var $this = $(this);

    if (!$this.hasClass("ac")) {
      $(wrapper + ".Rtable-data")
        .find(".ac")
        .removeClass("ac");

      id = $this.data("id");
      $(wrapper + ".confirm-btn").show();
      $this.addClass("ac");
    }
  });

  search();
})();
