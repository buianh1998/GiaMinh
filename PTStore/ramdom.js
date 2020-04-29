function SearchCKForTrang(x) {
    let arr = [""];
    let result = "";
    for (let i = 0; i < x; i++) {
        let boyFriend = Math.floor(Math.random() * arr.length);
        result += arr[boyFriend];
    }
    return result;
}
console.log(SearchCKForTrang(x));
// cái teampleat này này
// bh mình chia route sao cho hợp lý á
