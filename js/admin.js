$(function() {
	$('.del').click(function(e) {
		var target = $(e.target);
		var id = target.data('id');
		var li = $('.item-id-' + id);
		$.ajax({
			type: "DELETE",
			url: '/admin/list?id=' + id
		}).done(function(results) {
			if (results.success === 1) {
				if (li.length > 0) {
					li.remove()
				}
			}
		})
	})
})