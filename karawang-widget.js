(function() {
    async function fetchRSS() {
        const rssUrl = "https://karawangkab.go.id/rss.xml";
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`;

        try {
            const response = await fetch(proxyUrl);
            const text = await response.text();
            const parser = new DOMParser();
            const xml = parser.parseFromString(text, "text/xml");

            const items = xml.querySelectorAll("item");
            let output = "<ul style='padding:10px; list-style:none; margin:0; max-height:300px; overflow-y:auto;'>";

            items.forEach((item, index) => {
                if (index < 10) {
                    const title = item.querySelector("title").textContent;
                    const link = item.querySelector("link").textContent;
                    const pubDate = item.querySelector("pubDate") ? item.querySelector("pubDate").textContent : "";
                    output += `
                        <li style='margin-bottom:15px; padding:10px; border-bottom:1px solid #ddd;'>
                            <a href="${link}" target="_blank" style='text-decoration:none; color:#007bff; font-weight:bold; font-size:14px; display:block;'>${title}</a>
                            <span style='display:block; font-size:12px; color:#666;'>${new Date(pubDate).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </li>`;
                }
            });

            output += "</ul>";

            const widgetContainer = document.getElementById("karawang-widget-container");
            if (widgetContainer) {
                widgetContainer.innerHTML = `
                    <div style="border:1px solid #ddd; padding:0; width:100%; max-width:400px; background:#fff; box-shadow:0px 2px 5px rgba(0,0,0,0.1); border-radius:8px; overflow:hidden; font-family:Arial, sans-serif;">
                        <div style="display:flex; align-items:center; background:#005f31; color:white; padding:10px; text-align:center;">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/LAMBANG_KABUPATEN_KARAWANG.svg/441px-LAMBANG_KABUPATEN_KARAWANG.svg.png" style="height:40px; margin-right:10px;">
                            <div>
                                <span style="font-size:18px; font-weight:bold; display:block;">Government Public Relations (GPR)</span>
                                <span style="font-size:14px;">Kabupaten Karawang</span>
                            </div>
                        </div>
                        <div>${output}</div>
                        <div style="background:url('https://hargapasar.karawangkab.go.id/assets/vendor/media/img/bg-footer4.webp') no-repeat center; background-size:cover; height:60px; border-top:1px solid #ddd;"></div>
                    </div>
                `;
            }
        } catch (error) {
            console.error("Error fetching RSS:", error);
        }
    }

    document.addEventListener("DOMContentLoaded", fetchRSS);
})();
