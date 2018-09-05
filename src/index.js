import Handlebars from 'handlebars';
let redditThreadTemplateString = document.getElementById('reddit-thread').innerHTML;
let renderRedditThread = Handlebars.compile(redditThreadTemplateString);

$('form').submit((event) => {
    let subreddit = $('input:text').val();
    let url = `https://www.reddit.com/r/${subreddit}.json`;
    event.preventDefault();

    $('#results').html('<div class="loader">Loading...</div>');

    Handlebars.registerHelper('format-number', (num) => {
	return num.toLocaleString();
    });

    Handlebars.registerHelper('format-title', (title) => {
	if(title.length >= 30) {
	    title = title.slice(0, 23);
	    title += '...';
	}
	return title;
    });

    $.ajax({
	type: 'GET',
	url: url
    }).then((threads) => {
	$('#results').html('');
	console.log(threads.data.children);
	threads.data.children.forEach((thread) => {
	    let threadInfo = thread.data;
	    let renderedRedditThread = renderRedditThread(threadInfo);
	    $('#results').append(renderedRedditThread);
	});
    }, (error) => {
	$('#results').append('<h1 id="error">Error! Thread may not exist.</h1>');
	console.log('Error: ', error);
    });
});
