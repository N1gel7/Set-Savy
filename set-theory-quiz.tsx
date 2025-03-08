'use client'

import { useState, useEffect } from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"   

// Question 1: Prove A ∩ (B - A) = ∅ using set builder notation
const matchingPairs1 = [
  { step: "= {x | x ∈ A ∧ x ∈ B - A}", reason: "Set builder notation of A ∩ (B - A)" },
  { step: "= {x | x ∈ A ∧ x ∈ B ∧ x ∉ A}", reason: "Definition of intersection" },
  { step: "= {x | (x ∈ A ∧ x ∉ A) ∧ x ∈ B}", reason: "Second associative law for propositional logic" },
  { step: "= {x | (x ∈ A ∧ ¬(x ∈ A)) ∧ x ∈ B}", reason: "Definition of ∉" },
  { step: "= {x | F ∧ x ∈ B}", reason: "Second negation law for propositional logic" },
  { step: "= {x | F}", reason: "Second domination law for propositional logic" },
  { step: "= ∅", reason: "Set builder notation of ∅" }
]

// Question 2: Prove A ∩ (A ∪ B) = A using set theory laws
const proofSteps2 = [
  { step: "A ∩ (A ∪ B)", reason: "Given" },
  { step: "(A ∩ A) ∪ (A ∩ B)", reason: "Distributive law" },
  { step: "A ∪ (A ∩ B)", reason: "Idempotent law" },
  { step: "A", reason: "Absorption law" }
]

// Question 3: Prove A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C) using a truth table
const truthTable3 = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
]

const headers3 = ['A', 'B', 'C', '(B ∪ C)', '(A ∩ (B ∪ C))', '(A ∩ B)', '(A ∩ C)', '(A ∩ B) ∪ (A ∩ C)']

export function SetTheoryQuiz() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [progress, setProgress] = useState("0/3 Completed")
  const [progressPercentage, setProgressPercentage] = useState(0)
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([])

  // State for questions
  const [draggableSteps1, setDraggableSteps1] = useState(matchingPairs1.map(pair => pair.step))
  const [matches1, setMatches1] = useState<{ [key: string]: string | null }>({})
  const [draggableSteps2, setDraggableSteps2] = useState(proofSteps2.map(pair => pair.step))
  const [matches2, setMatches2] = useState<{ [key: string]: string | null }>({})
  const [userInputs3, setUserInputs3] = useState(Array(8).fill(Array(8).fill('')))
  const [cellStates3, setCellStates3] = useState(Array(8).fill(Array(8).fill('default')))

  useEffect(() => {
    checkCompletion()
  }, [matches1, matches2, cellStates3])

  const checkCompletion = () => {
    let newCompletedQuestions = [...completedQuestions]

    if (Object.keys(matches1).length === matchingPairs1.length &&
        matchingPairs1.every(pair => matches1[pair.step] === pair.reason) &&
        !newCompletedQuestions.includes(1)) {
      newCompletedQuestions.push(1)
    }

    if (Object.keys(matches2).length === proofSteps2.length &&
        proofSteps2.every(pair => matches2[pair.step] === pair.reason) &&
        !newCompletedQuestions.includes(2)) {
      newCompletedQuestions.push(2)
    }

    if (cellStates3.every(row => row.every((cell: string) => cell === 'correct')) &&
        !newCompletedQuestions.includes(3)) {
      newCompletedQuestions.push(3)
    }

    setCompletedQuestions(newCompletedQuestions)
    setProgress(`${newCompletedQuestions.length}/3 Completed`)
    setProgressPercentage((newCompletedQuestions.length / 3) * 100)

    if (newCompletedQuestions.length === 3) {
      setShowSuccess(true)
    }
  }

  const handleDragStart = (e: React.DragEvent, item: string) => {
    e.dataTransfer.setData('text', item)
  }

  const handleDrop1 = (e: React.DragEvent, targetStep: string) => {
    e.preventDefault()
    const droppedItem = e.dataTransfer.getData('text')
    const match = matchingPairs1.find(pair => pair.step === targetStep && pair.step === droppedItem)
    if (match) {
      setMatches1(prev => ({
        ...prev,
        [droppedItem]: match.reason
      }))
      setDraggableSteps1(prev => prev.filter(step => step !== droppedItem))
    }
  }

  const handleDrop2 = (e: React.DragEvent, targetStep: string) => {
    e.preventDefault()
    const droppedItem = e.dataTransfer.getData('text')
    const match = proofSteps2.find(pair => pair.step === targetStep && pair.step === droppedItem)
    if (match) {
      setMatches2(prev => ({
        ...prev,
        [droppedItem]: match.reason
      }))
      setDraggableSteps2(prev => prev.filter(step => step !== droppedItem))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleInputChange3 = (rowIndex: number, colIndex: number, value: string) => {
    const newUserInputs = userInputs3.map((row, i) =>
      i === rowIndex ? row.map((cell: any, j: number) => (j === colIndex ? value : cell)) : row
    )
    setUserInputs3(newUserInputs)

    const newCellStates = cellStates3.map((row, i) =>
      i === rowIndex
        ? row.map((cell: any, j: number) =>
            j === colIndex
              ? value === truthTable3[rowIndex][colIndex].toString()
                ? 'correct'
                : value === ''
                ? 'default'
                : 'incorrect'
              : cell
          )
        : row
    )
    setCellStates3(newCellStates)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Set Theory Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
          <h2 className="text-xl font-bold">Progress</h2>
          <p>{progress}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div 
              className="bg-blue-500 h-2.5 rounded-full transition-width duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-12">
          <section>
            <h3 className="text-lg font-semibold mb-4">
              Question 1: Prove that A ∩ (B - A) = ∅ using set builder notation.
            </h3>
            <p className="mb-4">
              Drag and drop the correct steps to complete the proof using set theory laws.
            </p>
            <div className="mb-8 p-4 bg-muted rounded-lg">
              <h4 className="text-md font-semibold mb-4">Draggable Steps:</h4>
              <div className="flex flex-wrap gap-2">
                {draggableSteps1.map((item, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    className="p-2 bg-white border rounded shadow cursor-move hover:bg-muted-foreground/5"
                  >
                    <code>{item}</code>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto bg-muted p-4 rounded-lg">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Steps</th>
                    <th className="px-4 py-2 text-left">Reasons</th>
                  </tr>
                </thead>
                <tbody>
                  {matchingPairs1.map((pair, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">
                        <div
                          className={`p-2 border rounded ${matches1[pair.step] ? 'bg-green-100' : 'bg-muted'} transition-colors`}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop1(e, pair.step)}
                        >
                          {matches1[pair.step] ? (
                            <div>
                              <code>{pair.step}</code>
                            </div>
                          ) : (
                            <span className="sr-only">Drag step here</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        {matches1[pair.step] && (
                          <div className="p-2 bg-white rounded">
                            <code>{matches1[pair.step]}</code>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {completedQuestions.includes(1) && (
              <p className="text-green-500 font-bold mt-4">Correct! You've completed this question.</p>
            )}
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4">
              Question 2: Prove the Second Absorption Law: A ∩ (A ∪ B) = A.
            </h3>
            <p className="mb-4">
              Drag and drop the correct steps to complete the proof using set theory laws.
            </p>
            <div className="mb-8 p-4 bg-muted rounded-lg">
              <h4 className="text-md font-semibold mb-4">Proof Steps:</h4>
              <div className="flex flex-wrap gap-2" role="list" aria-label="Draggable proof steps">
                {draggableSteps2.map((item, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    className="p-2 bg-white border rounded shadow cursor-move hover:bg-muted-foreground/5"
                    role="listitem"
                  >
                    <code>{item}</code>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto bg-muted p-4 rounded-lg">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Steps</th>
                    <th className="px-4 py-2 text-left">Reasons</th>
                  </tr>
                </thead>
                <tbody>
                  {proofSteps2.map((pair, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">
                        <div
                          className={`p-2 border rounded ${matches2[pair.step] ? 'bg-green-100' : 'bg-muted'} transition-colors`}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop2(e, pair.step)}
                          role="button"
                          tabIndex={0}
                          aria-label={`Drop zone for step ${pair.step}`}
                        >
                          {matches2[pair.step] ? (
                            <div>
                              <code>{pair.step}</code>
                            </div>
                          ) : (
                            <span>Drag step here</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        {matches2[pair.step] && (
                          <div className="p-2 bg-white rounded">
                            <code>{matches2[pair.step]}</code>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {completedQuestions.includes(2) && (
              <p className="text-green-500 font-bold mt-4">Correct! You've completed this question.</p>
            )}
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4">
              Question 3: Use a truth table to show that A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C).
            </h3>
            <p className="mb-4">
              Fill out the truth table to prove the equivalence.
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  {headers3.map((header, index) => (
                    <TableHead key={index}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {truthTable3.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, colIndex) => (
                      <TableCell key={colIndex} className="p-0">
                        <Input
                          type="text"
                          value={userInputs3[rowIndex][colIndex]}
                          onChange={(e) => handleInputChange3(rowIndex, colIndex, e.target.value)}
                          className={`w-full text-center ${
                            cellStates3[rowIndex][colIndex] === 'correct'
                              ? 'bg-green-200'
                              : cellStates3[rowIndex][colIndex] === 'incorrect'
                              ? 'bg-red-200'
                              : ''
                          }`}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {completedQuestions.includes(3) && (
              <p className="text-green-500 font-bold mt-4">Correct! You've completed this question.</p>
            )}
          </section>
        </div>

        <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Congratulations! 🎉</AlertDialogTitle>
              <p>You've successfully completed all questions in the Set Theory Quiz!</p>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}