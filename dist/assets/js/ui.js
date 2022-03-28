"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var html = document.querySelector('html');
var body = document.querySelector('body');
var Header = {
  init: function init() {
    this.menu();

    if ($('h2.title').length > 0) {
      $('title').text($('h2.title').text() + ' | 시대인재N 관리자');
    }
  },
  menu: function menu(e) {
    $('.btn-hamburger').on('click', function (e) {
      e.preventDefault();
      $('html').toggleClass('is-collapsed');
    });
  }
};
var Aside = {
  init: function init() {
    this.gnb();
  },
  gnb: function gnb() {
    //페이지 타이틀명과 비교하여 활성화
    if ($('.gnb').length > 0) {
      var title = $('h2.title').text();
      var $active = '';
      $('.gnb a').each(function () {
        if ($(this).text() == title) {
          $active = $(this);
        }
      });
      $active.parents('li').addClass('active'); //$active.parents('.has-treeview').addClass('open');
      //$('.dep1').css('opacity', '1');

      $('.gnb .has-treeview > a').on('click', function (e) {
        e.preventDefault();
        $(this).closest('li').toggleClass('open');
      });
    }
  }
};
var Common = {
  init: function init() {
    this.scrolling();
    this.event();
    window.addEventListener('mousewheel', Common.scrolling);
    window.addEventListener('touchmove', Common.scrolling);
    $(window).scroll(function () {
      Common.scrolling();
    });
  },
  scrolling: function scrolling(e) {
    var scrollTop = $(window).scrollTop();
    var gnbTop = $('#header').height();
    gnbTop = Number(gnbTop);

    if (scrollTop > 0) {
      $('html').addClass('is-scrolled');
    } else {
      $('html').removeClass('is-scrolled');
    } //scrollbar bottom check


    if ($('html').hasClass('is-scrolled')) {
      if ($(window).scrollTop() + $(window).height() > $(document).height() - 50) {
        $('html').addClass('is-bottom');
      } else {
        $('html').removeClass('is-bottom');
      }
    }
  },
  datePicker: function datePicker() {
    var _$$datepicker;

    //datepicker
    var currentDate = new Date();
    $('.form-datepicker').datepicker((_$$datepicker = {
      defaultDate: +7,
      changeMonth: true,
      changeYear: true,
      monthNames: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
      monthNamesShort: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
      dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
      showMonthAfterYear: true,
      showOtherMonths: true
    }, _defineProperty(_$$datepicker, "changeMonth", true), _defineProperty(_$$datepicker, "changeYear", true), _defineProperty(_$$datepicker, "dateFormat", "yy-mm-dd"), _defineProperty(_$$datepicker, "gotoCurrent", true), _defineProperty(_$$datepicker, "beforeShow", function beforeShow(input, inst) {
      $('#ui-datepicker-div').addClass('datepicker-box');
    }), _$$datepicker)).datepicker('setDate', 'today');
  },
  timePicker: function timePicker() {
    //timepicker
    $('.form-timepicker').each(function () {
      $(this).timepicker({
        showMeridian: false,
        defaultTime: '00:00'
      });
    });
  },
  event: function event() {
    $('[data-toggle="tooltip"]').tooltip(); //custom scroll

    $(".overflow-y-scroll").mCustomScrollbar({
      theme: "dark"
    }); //모달 중첩 z-index 조정

    $('.modal').on('show.bs.modal', function (e) {
      var zIndex = 1040 + 10 * $('.modal:visible').length;
      $(this).css('z-index', zIndex);
      setTimeout(function () {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
      }, 0);
    }).on('hidden.bs.modal', function () {
      if ($('.modal:visible').length > 0) {
        setTimeout(function () {
          $(document.body).addClass('modal-open');
        }, 0);
      }
    });
  }
};
Header.init();
Aside.init();
Common.init();