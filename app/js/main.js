$(function () {
  $(".menu__btn").on("click", function () {
    $(".menu__btn").toggleClass("menu__btn--active");
    $(".menu__list").toggleClass("menu__list--active");
  });

  $(".menu__item-link").on("click", function () {
    $(".menu__btn").removeClass("menu__btn--active");
    $(".menu__list").removeClass("menu__list--active");
  });

  /* $("#fullpage").fullpage({
    autoScrolling: true,
    scrollHorizontally: true,
    sectionSelector: ".page-section",
    normalScrollElements: ".feedback",
    scrollOverflow: true,
    menu: "#header__nav",
    anchors: ["top", "catalog", "schedule", "new", "food", "feedback"],
  }); */

  let $sliderIntro = $(".slider__items");
  let sliderCounter = document.createElement("div");
  sliderCounter.classList.add("slider__counter");

  let $sliderCatalog = $(".catalog__slides");
  let catalogCounter = document.createElement("div");
  catalogCounter.classList.add("catalog__counter");

  function updateSliderCounter(slick) {
    currentSlide = slick.currentSlide + 1;

    $(sliderCounter).text(currentSlide + "/" + slick.slideCount);
  }

  function updateCatalogCounter(slick) {
    currentSlide = slick.currentSlide + 1;
    $(catalogCounter).text(currentSlide + "/" + slick.slideCount);
  }

  /*

  function updateCounter(slick) {
    currentSlide = slick.currentSlide + 1;
    $(this).text(currentSlide + "/" + slick.slideCount);
  } */

  $sliderIntro.on("init", function (event, slick) {
    $sliderIntro.append(sliderCounter);
    updateSliderCounter(slick); // проверить
  });

  $sliderCatalog.on("init", function (event, slick) {
    $sliderCatalog.append(catalogCounter);
    updateCatalogCounter(slick); // проверить
  });

  $sliderIntro.slick({
    slidesToShow: 2,
    variableWidth: true,
    infinite: true,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="images/arrow-left.svg" alt="Предыдущее видео"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="images/arrow-right.svg" alt="Следующее видео"></button>',
    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          variableWidth: false,
          dots: true,
        },
      },
    ],
  });

  $sliderCatalog.slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    variableWidth: true,
    infinite: true,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="images/arrow-left.svg" alt="Предыдущее видео"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="images/arrow-right.svg" alt="Следующее видео"></button>',
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: false,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: false,
          arrows: false,
          dots: true,
        },
      },
    ],
  });

  $sliderIntro.on(
    "beforeChange",
    function (event, slick, currentSlide, nextSlide) {
      var direction,
        slideCountZeroBased = slick.slideCount - 1;

      if (nextSlide == currentSlide) {
        direction = "same";
      } else if (Math.abs(nextSlide - currentSlide) == 1) {
        direction = nextSlide - currentSlide > 0 ? "right" : "left";
      } else {
        direction = nextSlide - currentSlide > 0 ? "left" : "right";
      }

      // Добавляю временный CSS класс для плавной анимации перехода от последнего слайда к первому (.slick-current-clone-animate)
      if (direction == "right") {
        $(
          '.slick-cloned[data-slick-index="' +
            (nextSlide + slideCountZeroBased + 1) +
            '"]',
          $sliderIntro
        ).addClass("slick-current-clone-animate");
      }

      if (direction == "left") {
        $(
          '.slick-cloned[data-slick-index="' +
            (nextSlide - slideCountZeroBased - 1) +
            '"]',
          $sliderIntro
        ).addClass("slick-current-clone-animate");
      }
    }
  );

  $sliderIntro.on(
    "afterChange",
    function (event, slick, currentSlide, nextSlide) {
      // Удаляю временные CSS классы
      $(".slick-current-clone-animate", $sliderIntro).removeClass(
        "slick-current-clone-animate"
      );

      // Обновляю счетчик
      updateSliderCounter(slick);
    }
  );

  $sliderCatalog.on("afterChange", function (event, slick, currentSlide) {
    // Обновляю счетчик
    updateCatalogCounter(slick);
  });
});
