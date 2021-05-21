import Ajv from "ajv";


const paymentSchema = {
	"$id": "payment",
	"title": "Payment",
	"type": "object",
	"properties": {
		"mobile_num": {
			"type": "string",
			"pattern": "^[0-9]{10,15}$",
			"description":"Mobile Number of Partner"
		},
		"call_time": {
			"type": "string",
			"pattern": ".*",
			"description": "The call time in string representation"
		},
		"mpesa_code": {
			"type": "string",
			"pattern": ".*",
			"description": "The MPesa Code according to specification xxxx"
		},
		"mpesa_name": {
			"type": "string",
			"pattern": ".*",
			"description": "The MPesa Name according to specification xxxx"
		},
		"order_number": {
			"type": "string",
			"pattern": "^A[0-9]{6}-[0-9]{4}$",
			"description": "The Order Number according to specification xxxx"
		},
		"amount_paid": {
			"type": "number",
			"minimum": 0,
			"maximum": 1000,
			"description": "The amount paid"
		}
	},
	"required": [
		"mobile_num", 
		"call_time", 
		"mpesa_code", 
		"mpesa_name", 
		"order_number", 
		"amount_paid"
	]
};


const activationSchema = {
	"$id": "activation",
	"title": "Activation",
	"type": "object",
	"properties": {
		"mobile_num": {
			"type": "string",
			"pattern": "^[0-9]{10,15}$",
			"description":"Mobile Number of Partner"
		},
		"call_time": {
			"type": "string",
			"pattern": ".*",
			"description": "The call time in string representation"
		},
		"latitude": {
			"type": "number",
			"minimum": -90,
			"maximum": 90
		},
		"longitude": {
			"type": "number",
			"minimum": -180,
			"maximum": 180
		},
		"order_number": {
			"type": "string",
			"pattern": "^A[0-9]{6}-[0-9]{4}$",
			"description": "The Order Number according to specification xxxx"
		},
		"activation_code": {
			"type": "string",
			"pattern": "^[0-9]{6}$",
			"description": "The Activation Code according to specification xxxx"
		},
		"value_chain": {
			"type": "string",
			"pattern": "^(Maize|Coffee|Paddy)$",
			"description": "The Value Chain designator according to specification xxxx"
		},
		"amount_premium": {
			"type": "integer",
			"minimum": 0,
			"maximum": 1000,
			"description": "The amount of the premium"
		}
	},
	"required": [
		"mobile_num", 
		"call_time", 
		"latitude", 
		"longitude", 
		"order_number", 
		"activation_code", 
		"value_chain", 
		"amount_premium"
	]
};


const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

const validate = function(schema, data) {
	const validator = ajv.compile(schema);
	return validator(data);
};




PaymentsController = RouteController.extend({

	action: async function() {
	
		console.log(this.method, this.params, this.request.body);
	
		switch (this.method) {
	
		case 'GET':
			
			if (this.params.id) {
				const payment = Payments.findOne({_id: this.params.id});
				this.response.end(JSON.stringify(payment));
			} else {
				const payments = Payments.find({}).fetch();
				this.response.end(JSON.stringify(payments));
			}		

			break;
	
		case 'POST': 

			const data = this.request.body;
			
			if (validate(paymentSchema, data)) {
				Payments.insert(data);
				this.response.end('OK');
			} 
			
			break;	
	
		}	
	
		this.response.writeHead(502);
		this.response.end('Invalid data');
	}


});

ActivationsController = RouteController.extend({

	action: async function() {
	
		console.log(this.method, this.params, this.request.body);
	
		switch (this.method) {
	
		case 'GET':
			
			if (this.params.id) {
				const activation = Activations.findOne({_id: this.params.id});
				this.response.end(JSON.stringify(activation));
			} else {
				const activations = Activations.find({}).fetch();
				this.response.end(JSON.stringify(activations));
			}		
			
			break;
	
		case 'POST': 

			const data = this.request.body;
			
			if (validate(activationSchema, data)) {
				Activations.insert(data);
				this.response.end('OK');
			} 
			
			break;	
	
		}	
	
		this.response.writeHead(502);
		this.response.end('Invalid data');
	}


});
