const apiKey = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";
const BASE_URL = "https://api.giphy.com/v1/gifs/search";
const $formSearch = $('#formSearch');
const $btn_remove = $('#btn-remove');
const $searchTerm = $('#searchTerm');
const $giphyCard = $('#giphyCard');

$formSearch.on('submit', async (e) => {
    e.preventDefault();
    const term = {
        q: $searchTerm.val(),
        api_key: apiKey,
    }
    await searchImageByTerm(term);
});

$btn_remove.on('click', () => {
    $searchTerm.val("");
    $giphyCard.empty().clear();
     
});

async function searchImageByTerm(term) {
    try {
        const response = await axios.get(BASE_URL, { params: { q: term.q, api_key: term.api_key } });
        if (response && response.data.data.length) {
            const randomIndex = Math.floor(Math.random() * response.data.data.length);
            const imageUrl = response.data.data[randomIndex].images.original.url;
            addImage(imageUrl);
        }
    } catch (error) {

        let $divMessage = $("<div>", { class: "row" });
        $divMessage.innerText = error;
        $giphyCard.append($divMessage);
    }
}
function addImage(imgUrl) {

    let $divCol = $("<div>", { class: "col-md-4" });
    let $divCard = $("<div>", { class: "card" });
    let $divCardBody = $("<div>", { class: "card-body" });
    let $img = $("<img>", { src: imgUrl, class: "card-img-bottom" });

    $divCardBody.append($img);
    $divCard.append($divCardBody);
    $divCol.append($divCard);
    $giphyCard.append($divCol);
}
