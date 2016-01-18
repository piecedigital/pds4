key = AIzaSyBLRbr01sfJxpsheftChVI4TeRC2zDbtD4

#YouTube API

>
https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=[CHANNEL NAME]&key=[API APP KEY]
|
https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=[(JSON).items[0].contentDetails.uploads - PLAYLIST ID]]&maxResults=[DEFAULT IS 5]&key=[API APP KEY]
|
(JSON).[nextPageToken, prevPageToken] //usefull for pagenation
(JSON).items[LOOP].snippet.publishedAt
													.title
													.description
													.thumbnails.[default, medium, high, ~standard~, maxres].url
																																							.width
																																							.height
													.channelTitle
													.position
													.resourceId.videoId