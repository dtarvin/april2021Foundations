// $(function() {

    function simpleSlider(element = "#simple-slider", auto = false, pause) {
   
        console.log("simpleSlider entering");
        // Get parent element
        var $this = $(element);
        console.log('simpleSlider $this = ' + $this);
        // Slides container
        var slidesCont = $this.children('.slides-container');

        // Get all slides
        var slides = slidesCont.children('.slide');

        // Get pager div
        var pager = $this.children('.pager');

        // Get previous / next links
        var arrowsCont = $this.children('.arrows');
        var prevSlide = arrowsCont.children('.prev');
        var nextSlide = arrowsCont.children('.next');

        // Total slides count
        var slidesCount = slides.length;

        // Set currentSlide to first child
        var currentSlide = slides.first();
        var currentSlideIndex = 1;

        var autoPlay = null;

        // Hide all slides except first and add active class to first
        slides.not(':first').css('display', 'none');
        currentSlide.addClass('active');
    }

    function fadeNext() {
        console.log('fadeNext entering');
        currentSlide.removeClass('active').fadeOut(700);

        if (currentSlideIndex == slidesCount) {
            currentSlide = slides.first();
            currentSlide.delay(500).addClass('active').fadeIn(700);
            currentSlideIndex = 1;
        } else {
            currentSlideIndex++;
            currentSlide = currentSlide.next();
            currentSlide.delay(500).addClass('active').fadeIn(700);
        }

        pager.text(currentSlideIndex + ' / ' + slidesCount);
    }

    // function responsible for fading to previous slide
    function fadePrev() {
        currentSlide.removeClass('active').fadeOut(700);

        if (currentSlideIndex == 1) {
            currentSlide = slides.last();
            currentSlide.delay(500).addClass('active').fadeIn();
            currentSlideIndex = slidesCount;
        } else {
            currentSlideIndex--;
            currentSlide = currentSlide.prev();
            currentSlide.delay(500).addClass('active').fadeIn(700);
        }

        pager.text(currentSlideIndex + " / " + slidesCount);
    }

    // function that starts the autoplay and resets it in case user navigated away
    function AutoPlay() {
        clearInterval(autoPlay);

        if(auto == true) {
            autoPlay = setInterval(function() { fadeNext() }, pause);
        }

        // Detect if user clicked on arrow for next slide and face next slide if it did
        $(nextSlide).click(function(e) {
            e.preventDefault();
            fadeNext();
            AutoPlay();
        });

        // Detect if user clicked on arrow for previous slide...
        $(prevSlide).click(function(e) {
            e.preventDefault();
            fadePrev();
            AutoPlay();
        });

        // Start autoplay if auto is set to true
        AutoPlay();
    }

    $(function() {
        simpleSlider('#slider', true, 8000);
    });
// });