$(function() {

  var $window = $(window),
      $topName = $('h3.top-name'),
      $topLinks = $('.top-link'),
      $containerTop = $('.container-top'),
      $projectsTitle = $('.projects-page-title'),
      $resumeTitle = $('.resume-page-title'),
      $containerProjects = $('.container-projects');

  $window.scroll(function() {

    if ($window.scrollTop() > 80) {
      $topName.addClass('shown');
      $topLinks.addClass('shown');
      $containerTop.addClass('shown');
    } else {
      $topName.removeClass('shown');
      $topLinks.removeClass('shown');
      $containerTop.removeClass('shown');
    }

    if ($window.scrollTop() > 320 && $window.width() > 450) {
      $projectsTitle.addClass('sticky');
      $resumeTitle.addClass('sticky');
      $containerProjects.addClass('sticky');
    } else {
      $projectsTitle.removeClass('sticky');
      $resumeTitle.removeClass('sticky');
      $containerProjects.removeClass('sticky');
    }
  });

  $window.trigger('scroll');


});