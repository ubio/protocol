sendOutput()
    POST /pr/executions/:id/outputs { bookingSuccess, availableFlights }

fetchInput()
    look in execution
    poll GET /pr/executions/:id/inputs { type }

---
Job.messages { id, type = [output|input], timestamp, messageType, body }
Execution.messages { id, type = [output|input], timestamp, messageType, body }
---

---
Job.inputs { id, type, timestamp, body }
Job.outputs { id, type, timestamp, body }
Execution.outputs { id, timestamp, type, body }
---


Domain
    - input data
    - output data
    - type definitions