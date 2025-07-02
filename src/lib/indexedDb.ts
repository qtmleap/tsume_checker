const DB_NAME = 'hashes-db'
const STORE_NAME = 'hashes'
const DB_VERSION = 1

/* DB を開く ───────────────────────── */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME, { keyPath: 'hash' })
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

/* ハッシュ初期化 ───────────────────── */
export async function initHashes() {
  const db = await openDB()

  /* 1) 変更有無判定 ───────────────────── */
  let needUpdate = true
  try {
    const headRes = await fetch('/data/hashes.csv', { method: 'HEAD' })
    const lastMod = headRes.headers.get('Last-Modified') ?? ''
    const cachedMod = localStorage.getItem('hashes:lastModified')
    if (cachedMod && cachedMod === lastMod) needUpdate = false
    else localStorage.setItem('hashes:lastModified', lastMod)
  } catch {
    // HEAD 失敗時はとりあえず更新する
  }
  if (!needUpdate) return

  /* 2) CSV 取得 & パース ───────────────── */
  const text = await fetch('/data/hashes.csv').then((r) => r.text())
  const hashes = text
    .trim()
    .split('\n')
    .map((l) => l.split(',')[0])
    .filter(Boolean)

  /* 3) ストア更新 ─────────────────────── */
  const tx = db.transaction(STORE_NAME, 'readwrite')
  const store = tx.objectStore(STORE_NAME)
  store.clear()
  hashes.forEach((hash) => store.put({ hash }))
  await new Promise<void>((res, rej) => {
    tx.oncomplete = () => res()
    tx.onerror = () => rej(tx.error)
  })
}
