function fetchData(){
	fetch("https://api.dailymotion.com/videos?fields=id%2Cthumbnail_360_url%2Ccreated_time%2Cviews_total%2Ctitle%2Cowner.username%2cowner.avatar_80_url&search=wired+tech+support")
	.then(response => {
		if(!response.ok)
		{
			throw Error("ERROR");
		}

		return response.json();
	})
	.then(data => {
		console.log(data.list);
		const html = data.list.map(video => {
			const time = video.created_time;
			const sec = time*1000;
			const date=new Date(sec);
			const format = date.toLocaleString();
			date.toLocaleString("en-US",{month: "long"});
			date.toLocaleString("en-US",{day: "numeric"});
			date.toLocaleString("en-US",{month: "numeric"});
			return `<div class="card" id="app">
				<div class="image">
					<img src="${video.thumbnail_360_url}">
				</div>
				<div class="title">
					<h1 id="header">${video.title}</h1>
				</div>
				<div class="des">
					<table class="cardtable">
						<tr>
							<td><img src="${video.thumbnail_360_url}" class="cardimg"></td>
							<td><p style="font-size:12px;">${video.username}</p></td>
						</tr>
					</table>
					<p class="cardp">Date Posted: ${format} | Views: ${video.views_total}</p>
				</div>
			</div>`;
			
		})
		.join("")
		console.log(html)
		document.querySelector("#app").insertAdjacentHTML("afterbegin", html);
		
	})
	.catch(error => {
		console.log(error);
	});
}


fetchData();
