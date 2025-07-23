import { useEffect, useRef, DependencyList } from "react"

export function useStateEffect(
  effectFunction: () => void | (() => void), 
  dependencies: DependencyList
) {
  const isMountingRef = useRef(false)

  useEffect(() => {
    isMountingRef.current = true
  }, [])

  useEffect(() => {
    if(!isMountingRef.current) {
      return effectFunction()
    } else {
      isMountingRef.current = false
    }
  }, dependencies)
}