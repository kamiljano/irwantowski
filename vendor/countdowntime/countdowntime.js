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
            const diffInSeconds = Math.floor((Date.now() - options.startTime) / 1000);
            return {
                years: Math.floor(diffInSeconds / (365.25 * 24 * 60 * 60)),
                days:  Math.floor((diffInSeconds % (365.25 * 24 * 60 * 60)) / (24 * 60 * 60)),
                hours:  Math.floor((diffInSeconds % (24 * 60 * 60)) / (60 * 60)),
                minutes: Math.floor((diffInSeconds % (60 * 60)) / 60),
                seconds: diffInSeconds % 60
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