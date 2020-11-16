let dbPromise = idb.open("submission-2", 3, function (upgradeDB) {
    if (!upgradeDB.objectStoreNames.contains('teamFavorite')) {
        let teamStore = upgradeDB.createObjectStore('teamFavorite', {
            keyPath: 'id',
            autoIncrement: false
        })
        teamStore.createIndex('id', 'id', {
            unique: true
        })
    }
})

// baca data
function getAllTeamFav() {
    return dbPromise.then(async db => {
        let tx = await db.transaction('teamFavorite', 'readonly')
        let store = await tx.objectStore('teamFavorite')
        return await store.getAll()
    })
}

// cek dataawal
function cekFav(id) {
    return dbPromise.then(async db => {
        let tx = await db.transaction('teamFavorite', 'readonly')
        let data = await tx.objectStore('teamFavorite').get(id)
        return data == undefined ? false : true
    })

}
// menambahkan data
function tambahTeamFav(data) {
    dbPromise.then(db => {
        let tx = db.transaction('teamFavorite', 'readwrite')
        tx.objectStore('teamFavorite').add(data)
        return tx.complete
    })
}
// menghapus data
function hapusTeamFav(id) {
    dbPromise.then(db => {
        let tx = db.transaction('teamFavorite','readwrite')
        tx.objectStore('teamFavorite').delete(id)
        return tx.complete
    })
}