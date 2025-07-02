const DB_NAME = 'hashes-db'
const STORE_NAME = 'hashes'
const DB_VERSION = 1

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'hash' })
      }
    }
  })
}

export async function initHashes() {
  const db = await openDB()

  // skip if already initialised
  const count = await new Promise<number>((res, rej) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const req = tx.objectStore(STORE_NAME).count()
    req.onsuccess = () => res(req.result)
    req.onerror = () => rej(req.error)
  })
  if (count > 0) return

  const csvText = await fetch('/data/hashes.csv').then((r) => r.text())
  const lines = csvText.trim().split('\n')
  const hashes = lines.map((l) => l.split(',')[0]).filter(Boolean)

  const tx = db.transaction(STORE_NAME, 'readwrite')
  const store = tx.objectStore(STORE_NAME)
  for (const hash of hashes) {
    store.put({ hash })
  }
  await new Promise<void>((res, rej) => {
    tx.oncomplete = () => res()
    tx.onerror = () => rej(tx.error)
  })
}
