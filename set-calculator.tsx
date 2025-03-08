'use client'

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/buttonset"
import { Input } from "@/components/ui/inputset"
import { Label } from "@/components/ui/labelset"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cardset"
import { Eye } from 'lucide-react'
import * as d3 from 'd3'

const parseSet = (str: string): Set<number> => {
  const trimmed = str.trim()
  if (trimmed === '{}' || trimmed === '') return new Set()
  if (!trimmed.startsWith('{') || !trimmed.endsWith('}')) {
    throw new Error("Invalid set notation. Please use curly braces, e.g., {1, 2, 3}")
  }
  const elements = trimmed.slice(1, -1).split(',').map(item => {
    const num = Number(item.trim())
    if (isNaN(num)) {
      throw new Error("Invalid input. Please enter only numbers.")
    }
    return num
  }).filter(Boolean)
  return new Set(elements)
}

const setToString = (set: Set<number>): string => {
  return `{${Array.from(set).join(', ')}}`
}

const union = (a: Set<number>, b: Set<number>): Set<number> => new Set([...a, ...b])
const intersection = (a: Set<number>, b: Set<number>): Set<number> => new Set([...a].filter(x => b.has(x)))
const difference = (a: Set<number>, b: Set<number>): Set<number> => new Set([...a].filter(x => !b.has(x)))
const symmetricDifference = (a: Set<number>, b: Set<number>): Set<number> => new Set([...difference(a, b), ...difference(b, a)])
const isSubset = (a: Set<number>, b: Set<number>): boolean => [...a].every(x => b.has(x))
const complement = (a: Set<number>, universal: Set<number>): Set<number> => difference(universal, a)

export default function Component() {
  const [setA, setSetA] = useState("{1, 2, 3}")
  const [setB, setSetB] = useState("{2, 3, 4}")
  const [result, setResult] = useState("")
  const [error, setError] = useState("")
  const [showVisual, setShowVisual] = useState(false)
  const [operation, setOperation] = useState("")
  const vennRef = useRef<SVGSVGElement>(null)

  const handleSetChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value)
    setError("")
    setResult("")
    setOperation("")
    setShowVisual(false)
  }

  const handleOperation = (op: string) => {
    setError("")
    setOperation(op)
    try {
      const a = parseSet(setA)
      const b = parseSet(setB)
      const universal = union(a, b)
      let res: Set<number> | boolean

      switch (op) {
        case "union":
          res = union(a, b)
          break
        case "intersection":
          res = intersection(a, b)
          break
        case "differenceAB":
          res = difference(a, b)
          break
        case "differenceBA":
          res = difference(b, a)
          break
        case "symmetricDifference":
          res = symmetricDifference(a, b)
          break
        case "subsetAB":
          res = isSubset(a, b)
          setResult(res ? "True" : "False")
          setShowVisual(true)
          return
        case "subsetBA":
          res = isSubset(b, a)
          setResult(res ? "True" : "False")
          setShowVisual(true)
          return
        case "complementA":
          res = complement(a, universal)
          break
        case "complementB":
          res = complement(b, universal)
          break
        default:
          throw new Error("Invalid operation")
      }
      setResult(setToString(res as Set<number>))
      setShowVisual(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setShowVisual(false)
    }
  }

  useEffect(() => {
    if (showVisual && vennRef.current && operation) {
      console.log("Rendering Venn Diagram...")
      const svg = d3.select(vennRef.current)
      svg.selectAll("*").remove() // Clear previous drawing

      const width = 400
      const height = 300
      const radius = 80

      svg.attr("width", width).attr("height", height)

      const a = parseSet(setA)
      const b = parseSet(setB)

      console.log("Set A:", a)
      console.log("Set B:", b)

      const centerA = { x: width / 2 - 40, y: height / 2 }
      const centerB = { x: width / 2 + 40, y: height / 2 }

      const circleA = svg.append("circle")
        .attr("cx", centerA.x)
        .attr("cy", centerA.y)
        .attr("r", radius)
        .style("fill", "rgba(255, 0, 0, 0.2)")
        .style("stroke", "red")

      const circleB = svg.append("circle")
        .attr("cx", centerB.x)
        .attr("cy", centerB.y)
        .attr("r", radius)
        .style("fill", "rgba(0, 0, 255, 0.2)")
        .style("stroke", "blue")

      svg.append("text")
        .attr("x", centerA.x - radius)
        .attr("y", centerA.y - radius - 10)
        .text("A")
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .attr("fill", "red")

      svg.append("text")
        .attr("x", centerB.x + radius)
        .attr("y", centerB.y - radius - 10)
        .text("B")
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .attr("fill", "blue")

      const intersectionAB = intersection(a, b)
      const uniqueA = difference(a, b)
      const uniqueB = difference(b, a)

      console.log("Intersection of A and B:", intersectionAB)
      console.log("Unique elements in A:", uniqueA)
      console.log("Unique elements in B:", uniqueB)

      const positionMembers = (elements: Set<number>, center: { x: number, y: number }, radius: number, startAngle: number, endAngle: number) => {
        const members = Array.from(elements)
        const angleStep = (endAngle - startAngle) / (members.length + 1)
        console.log(`Positioning ${members.length} members from ${startAngle} to ${endAngle}`)
        members.forEach((member, i) => {
          const angle = startAngle + (i + 1) * angleStep
          const x = center.x + radius * 0.7 * Math.cos(angle)
          const y = center.y + radius * 0.7 * Math.sin(angle)
          svg.append("text")
            .attr("x", x)
            .attr("y", y)
            .text(member.toString())
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("font-size", "12px")
        })
      }

      positionMembers(uniqueA, centerA, radius, Math.PI / 2, 3 * Math.PI / 2)
      positionMembers(uniqueB, centerB, radius, -Math.PI / 2, Math.PI / 2)
      positionMembers(intersectionAB, { x: width / 2, y: height / 2 }, radius / 2, 0, 2 * Math.PI)

      const highlightResult = () => {
        console.log("Highlighting result for operation:", operation)
        switch (operation) {
          case "union":
            console.log("Union: Highlighting both sets.")
            circleA.style("fill", "rgba(255, 0, 0, 0.4)")
            circleB.style("fill", "rgba(0, 0, 255, 0.4)")
            break
          case "intersection":
            console.log("Intersection: Highlighting intersection.")
            svg.append("circle")
              .attr("cx", width / 2)
              .attr("cy", height / 2)
              .attr("r", radius / 2)
              .style("fill", "rgba(128, 0, 128, 0.4)")
              .style("stroke", "purple")
            break
          case "differenceAB":
            console.log("Difference A-B: Highlighting A but not B.")
            circleA.style("fill", "rgba(255, 0, 0, 0.4)")
            svg.append("circle")
              .attr("cx", centerB.x)
              .attr("cy", centerB.y)
              .attr("r", radius)
              .style("fill", "white")
              .style("stroke", "none")
            break
          case "differenceBA":
            console.log("Difference B-A: Highlighting B but not A.")
            circleB.style("fill", "rgba(0, 0, 255, 0.4)")
            svg.append("circle")
              .attr("cx", centerA.x)
              .attr("cy", centerA.y)
              .attr("r", radius)
              .style("fill", "white")
              .style("stroke", "none")
            break
          case "symmetricDifference":
            console.log("Symmetric Difference: Highlighting parts that are in A or B but not both.")
            circleA.style("fill", "rgba(255, 0, 0, 0.4)")
            circleB.style("fill", "rgba(0, 0, 255, 0.4)")
            svg.append("circle")
              .attr("cx", width / 2)
              .attr("cy", height / 2)
              .attr("r", radius / 2)
              .style("fill", "white")
              .style("stroke", "none")
            break
          case "complementA":
            console.log("Complement A: Highlighting only B, excluding intersection.");
            circleA.style("fill", "white");
            circleB.style("fill", "rgba(0, 0, 255, 0.4)");
            svg.append("rect")
              .attr("x", 0)
              .attr("y", 0)
              .attr("width", width)
              .attr("height", height)
              .style("fill", "rgba(128, 128, 128, 0.2)");
            // Add a white circle to cover the intersection
            svg.append("circle")
              .attr("cx", width / 2)
              .attr("cy", height / 2)
              .attr("r", radius / 2)
              .style("fill", "white")
              .style("stroke", "none");
            break;
          case "complementB":
            console.log("Complement B: Highlighting only A, excluding intersection.");
            circleA.style("fill", "rgba(255, 0, 0, 0.4)");
            circleB.style("fill", "white");
            svg.append("rect")
              .attr("x", 0)
              .attr("y", 0)
              .attr("width", width)
              .attr("height", height)
              .style("fill", "rgba(128, 128, 128, 0.2)");
            // Add a white circle to cover the intersection
            svg.append("circle")
              .attr("cx", width / 2)
              .attr("cy", height / 2)
              .attr("r", radius / 2)
              .style("fill", "white")
              .style("stroke", "none");
            break;
          case "subsetAB":
            console.log("Subset: Checking if A is a subset of B.")
            if (isSubset(a, b)) {
              console.log("A is a subset of B.")
              circleA.style("fill", "rgba(255, 0, 0, 0.4)")
              circleB.style("fill", "rgba(0, 0, 255, 0.2)")
            } else {
              console.log("A is not a subset of B.")
              circleA.style("fill", "rgba(255, 0, 0, 0.2)")
              circleB.style("fill", "rgba(0, 0, 255, 0.2)")
            }
            break
          case "subsetBA":
            console.log("Subset: Checking if B is a subset of A.")
            if (isSubset(b, a)) {
              console.log("B is a subset of A.")
              circleB.style("fill", "rgba(0, 0, 255, 0.4)")
              circleA.style("fill", "rgba(255, 0, 0, 0.2)")
            } else {
              console.log("B is not a subset of A.")
              circleB.style("fill", "rgba(0, 0, 255, 0.2)")
              circleA.style("fill", "rgba(255, 0, 0, 0.2)")
            }
            break
          default:
            console.log("Unknown operation:", operation)
        }
      }

      highlightResult()

      svg.append("text")
        .attr("x", width / 2)
        .attr("y", height - 10)
        .text(`Result: ${result}`)
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")

      console.log("Venn Diagram rendering completed.")
    }
  }, [showVisual, setA, setB, operation, result])

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Set Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="setA">Set A</Label>
              <Input
                id="setA"
                value={setA}
                onChange={handleSetChange(setSetA)}
                placeholder="{1, 2, 3}"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Enter set elements as numbers in curly braces, separated by commas. E.g., {'{1, 2, 3}'}
              </p>
            </div>
            <div>
              <Label htmlFor="setB">Set B</Label>
              <Input
                id="setB"
                value={setB}
                onChange={handleSetChange(setSetB)}
                placeholder="{2, 3, 4}"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Enter set elements as numbers in curly braces, separated by commas. E.g., {'{1, 2, 3}'}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <Button onClick={() => handleOperation("union")}>∪ Union</Button>
            <Button onClick={() => handleOperation("intersection")}>∩ Intersection</Button>
            <Button onClick={() => handleOperation("differenceAB")}>A - B</Button>
            <Button onClick={() => handleOperation("differenceBA")}>B - A</Button>
            <Button onClick={() => handleOperation("symmetricDifference")}>⨁ Symmetric Difference</Button>
            <Button onClick={() => handleOperation("subsetAB")}>A ⊆ B</Button>
            <Button onClick={() => handleOperation("subsetBA")}>B ⊆ A</Button>
            <Button onClick={() => handleOperation("complementA")}>A' </Button>
            <Button onClick={() => handleOperation("complementB")}>B'</Button>
          </div>
          {error && <div className="text-destructive text-center">{error}</div>}
          <div className="bg-muted p-4 rounded-md">
            <Label>Result</Label>
            <div className="text-lg font-mono break-all">{result}</div>
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setShowVisual(!showVisual)}>
              <Eye className="w-4 h-4 mr-2" />
              {showVisual ? "Hide" : "Show"} Visual
            </Button>
          </div>
        </div>
        {showVisual && (
          <div className="mt-4">
            <svg ref={vennRef} className="w-full h-[300px]"></svg>
            <div className="mt-4 text-center">
              <p><strong>Operation:</strong> {operation}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}