(function ($) {
    "use strict";

    $.fn.extend({ 

      count: function(options) {
        if (!options.startTime) {
          throw new Error('No startTime specified');
        }

        return this.each(function() {
          const obj = $(this);
          
          initializeClock();

          function getTimeFromStartTime() {
            const now = moment();
            return {
              years: now.diff(options.startTime, 'years'),
              days: now.diff(options.startTime, 'days') % 365,
              hours: now.diff(options.startTime, 'hours') % 24,
              minutes: now.diff(options.startTime, 'minutes') % 60,
              seconds: now.diff(options.startTime, 'seconds') % 60
            };
          }

          function initializeClock() {
            const yearsSpan = $(obj).find('.years');
            const daysSpan = $(obj).find('.days');
            const hoursSpan = $(obj).find('.hours');
            const minutesSpan = $(obj).find('.minutes');
            const secondsSpan = $(obj).find('.seconds');

            function updateClock() { 
              const t = getTimeFromStartTime();

              yearsSpan.html(t.years);
              daysSpan.html(t.days);
              hoursSpan.html(('0' + t.hours).slice(-2));
              minutesSpan.html(('0' + t.minutes).slice(-2));
              secondsSpan.html(('0' + t.seconds).slice(-2))
            }

            updateClock();
            setInterval(updateClock, 1000);
          }
        });
      }
    });

})(jQuery);