import { useState, useRef, useEffect } from 'react'

export function useMounted(fn) {
  isFunc(fn)
  const mounting = useRef(true)
  useEffect(() => {
    if (mounting.current) {
      fn()
      mounting.current = false
    }
  })
}

export function useWillMount(fn) {
  isFunc(fn)
  const willMount = useRef(true)
  if (willMount.current) {
    fn()
  }
  willMount.current = false
}

export function useWillUnMount(fn) {
  isFunc(fn)
  useEffect(() => {
    return fn
  })
}

export function useMergeState(initialValue) {
  const [state, setState] = useState(initialValue)
  let setMergeState = setState
  if (typeof initialValue === 'object') {
    setMergeState = (newState) => {
      setState({
        ...state,
        ...newState,
      })
    }
  }
  return [state, setMergeState]
}

export function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

export function useStorageState(initialValue, key, type) {
  const [state, setState] = useState(initialValue)
  const storage = type === 'local' ? localStorage : sessionStorage
  useEffect(() => {
    storage[key] = JSON.stringify(state)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])
  return [state, setState]
}
