(function () {

	function Application() {

		var that = this;
		this.sections = [];

		this.init = function () {
			this.storeSections();
			this.showSection('hi');
		};

		this.storeSections = function () {
			$.each($('.section'), function (i, _section) {
				var section = $(_section);
				that.sections[section.attr('id')] = section;
			});
		};

		this.showSection = function (id) {
			var section = this.getSection(id);

			$('.section').on('mouseenter', '.moving-letter', function (e) {
				$(this).trigger('reset').transition({
					perspective: '100px',
					rotateY    : '+=360deg'
				});
			});

			section.transition({
				y      : '-=50px',
				opacity: 1
			}, 1000, function () {
				$.each(section.find('span'), function (i, _span) {
					var span = $(_span);

					span.children().andSelf().contents().each(function () {
						if (this.nodeType == 3) {
							var $this = $(this);
							$this.replaceWith($this.text().replace(/(\w)/g, "<span class='moving-letter'>$&</span>"));
						}
					});

					$.each(span.find('.moving-letter'), function (i, ml) {
						i++;
						setTimeout(function () {
							$(ml).addClass('colored').trigger('mouseenter');
						}, i * ((Math.random() * 10) + 1) * 45);
					});

				});
			});

		};

		this.getSection = function (id) {
			return this.sections[id];
		};
	}

	var App = new Application();
	App.init();

	$('.section').curtain(0, function (section) {
//		console.log($(section).attr('id'));
	});

}());
