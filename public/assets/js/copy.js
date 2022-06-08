// Tooltip

$("#copyssh").tooltip({
  trigger: "click",
  placement: "top",
});

$("#copyipv4").tooltip({
  trigger: "click",
  placement: "top",
});

$("#copyipv6").tooltip({
  trigger: "click",
  placement: "top",
});

function setTooltip(el, message) {
  el.tooltip("hide").attr("data-original-title", message).tooltip("show");
}

function hideTooltip(el) {
  setTimeout(function () {
    el.tooltip("hide");
  }, 1000);
}

// Clipboards
var copyssh = new ClipboardJS("#copyssh");
var clipboardipv4 = new ClipboardJS("#copyipv4");
var clipboardipv6 = new ClipboardJS("#copyipv6");

copyssh.on("success", function (e) {
  setTooltip($("#copyssh"), "Copied!");
  hideTooltip($("#copyssh"));
});

copyssh.on("error", function (e) {
  setTooltip($("#copyipv4"), "Failed!");
  hideTooltip($("#copyipv4"));
});

clipboardipv4.on("success", function (e) {
  setTooltip($("#copyipv4"), "Copied!");
  hideTooltip($("#copyipv4"));
});

clipboardipv4.on("error", function (e) {
  setTooltip($("#copyipv4"), "Failed!");
  hideTooltip($("#copyipv4"));
});

clipboardipv6.on("success", function (e) {
  setTooltip($("#copyipv6"), "Copied!");
  hideTooltip($("#copyipv6"));
});

clipboardipv6.on("error", function (e) {
  setTooltip($("#copyipv6"), "Failed!");
  hideTooltip($("#copyipv6"));
});
