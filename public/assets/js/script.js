$(document).ready(function () {
  $(".sideMenuToggler").click(function () {
    $(".sideMenu").toggleClass("active");
    $(".text").toggleClass("text-active");
    $(".icon").toggleClass("icon-active");
    $(".nav-link").toggleClass("nav-link-active");
    $(".main").toggleClass("main-active");
    $(".dropdown").toggleClass("dropdown-active");
    $(".submenu_icon").toggle();
  });
  $(".smm").click(function () {
    $(".sideMenu").toggleClass("smm-active");
    $(".main").toggleClass("main-active");
  });
  // $("#home").click(function () {
  //   $("#home_expand").text() == "expand_less"
  //     ? $("#home_expand").text("expand_more")
  //     : $("#home_expand").text("expand_less");
  //   $("#home_submenu").slideToggle();
  // });
  $(".sideMenu-li").each(function (index) {
    $(this).hover(
      function () {
        $(this).find(".submenu_circle").css("background-color", "transparent");
      },
      function () {
        $(this).find(".submenu_circle").css("background-color", "#F80");
      }
    );
  });
});

function activeSideBar(name) {
  $("#" + name).addClass("sideMenu-li-active");
}

function logout() {
  if (confirm("Do you really want to logout")) {
    // DO POST
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/admin/logout",
    }).done((res) => {
      if (res == "success") {
        window.location.href = "/admin/login";
      } else {
        alert(res);
      }
    });
  }
}

function dropdown(div) {
  var home = div.find("#home_expand");
  var content = div.find("#dropdown-content");
  home.text() == "expand_less"
    ? home.text("expand_more")
    : home.text("expand_less");

  content.slideToggle();
}

function displayPP(input, el) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      el.html(
        `<img src="${e.target.result}" style="height: 100px; width: 100px;">`
      );
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function dialog(message, yesCallback, noCallback) {
  $(".title").html(message);
  var dialog = $("#modal_dialog").dialog();

  $("#btnYes").click(function () {
    dialog.dialog("close");
    yesCallback();
  });
  $("#btnNo").click(function () {
    dialog.dialog("close");
    noCallback();
  });
}
$(".student_story").owlCarousel({
  autoplay: true,
  autoplayTimeout: 3000,
  loop: true,
  responsiveClass: true,
  items: 2,
  nav: false,
  margin: 10,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
  },
});

function failedSnakbar(msg, position = "bottom-right") {
  Snackbar.show({
    text: msg,
    pos: position,
    customClass: "snackbar-custom-d",
    showAction: true,
    actionText: "×",
    actionTextColor: "#000",
  });
}

function successSnakbar(msg, position = "bottom-right") {
  Snackbar.show({
    text: msg,
    pos: position,
    customClass: "snackbar-custom-s",
    showAction: true,
    actionText: "×",
    actionTextColor: "#000",
  });
}

// sidebar scroll
$(function () {
  $(".toggle-menu").click(function (e) {
    e.preventDefault();
    $(".sidebar").toggleClass("toggled");
  });
});

// sidebar scroll end
