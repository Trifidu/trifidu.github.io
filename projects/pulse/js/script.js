const slider = tns({
  container: ".carousel__inner",
  items: 1,
  slideBy: 1,
  controlsContainer: "#customize-controls",
  navPosition: "bottom",
  touch: true,
  mouseDrag: true,
  preventScrollOnTouch: "auto",
  responsive: {
    993: {
      nav: false,
      controls: true,
    },
    992: {},
    767: {},
    100: {
      controls: false,
      nav: true,
      //   navContainer: "#customize-nav",
    },
  },
});

const slider_feed = tns({
  container: ".feed__slider",
  items: 1,
  slideBy: 1,
  navPosition: "bottom",
  touch: true,
  mouseDrag: true,
  preventScrollOnTouch: "auto",
  autoplayButtonOutput: false,

  responsive: {
    993: {},
    992: {
      disable: true,
    },
    769: {},
    100: {
      disable: false,
      controls: false,
      nav: true,
      autoplay: true,
    },
  },
});

$(document).ready(function () {
  $("ul.catalog__tabs").on(
    "click",
    "li:not(.catalog__tab_active)",
    function () {
      $(this)
        .addClass("catalog__tab_active")
        .siblings()
        .removeClass("catalog__tab_active")
        .closest("div.container")
        .find("div.catalog__content")
        .removeClass("catalog__content_active")
        .eq($(this).index())
        .addClass("catalog__content_active");
    }
  );

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog-item__content")
          .eq(i)
          .toggleClass("catalog-item__content_active");
        $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
      });
    });
  }
  toggleSlide(".catalog-item__link");
  toggleSlide(".catalog-item__back");

  //Modal
  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn("slow");
  });
  $(".modal__close").on("click", function () {
    $(".overlay, #consultation, #thanks, #order").fadeOut("slow");
  });

  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
      $(".overlay, #order").fadeIn("slow");
    });
  });
  //validation Forms
  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: "Пожалуйста, введите своё имя",
          minlength: jQuery.validator.format(
            "Нужно ввести минимум {0} символа"
          ),
        },
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Пожалуйста, введите свой почтовый адрес",
          email: "Ваш емейл адрес должен быть в формате name@domain.com",
        },
      },
    });
  }
  validateForms("#consultation-form");
  validateForms("#consultation form");
  validateForms("#order form");

  $("input[name=phone]").mask("+7 (999) 999-99-99");

  $("form").submit(function (e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $(".overlay, #thanks").fadeIn("slow");

      $("form").trigger("reset");
    });
    return false;
  });

  //smooth  scroll and pageup
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $(".pageup").fadeIn();
    } else {
      $(".pageup").fadeOut();
    }
  });
  $("a[href='#uppage']").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
  });
});
