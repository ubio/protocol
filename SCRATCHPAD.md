sendOutput()
    POST /pr/executions/:id/outputs { bookingSuccess, availableFlights }

fetchInput()
    look in worker-local cache
    poll GET /pr/executions/:id/inputs { type }

---
Job.inputs { id, type, timestamp, body }
Job.outputs { id, type, timestamp, body }
---
