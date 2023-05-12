#!/usr/bin/env python3

# The mm is meant to monitor pending crosschain operations in order to see if any can benefit from his liquidity providing

POLYGON_CHAINID = ..

MM_PREFS = {
			"accepted_tokens": [
				{"symbol": "*DAI", "max_per_trade": 10_000},
			 ],
			"originating_chains": {
				"polygon": {"max_pending_trades": 1, "min_waiting_time": 0},
			 }
		}



def fetch_next_evm_opp(originating_chainid):
	POLYGON_RPC = ".."
	while True: pass #FIXME
	event = None
	return evm_event_to_opp(event)


class OpportunitiesEvaluator:
	def __init__(self, preferences, opp):
		self.prefs = preferences
		self.opp = opp
	def evaluate(self):
		if thatsok:
			# the mm fees accrue immediately + the user receives his funds straight away
			if self.submit_early_digest(self.opp.destination_chainid, self.opp.id, self.opp.destination_addr, self.opp.token_symbol, self.opp.token_amount):
				print("The user is happy, the mm is shaking. Fingers crossed...")
				#...
				self.dispatchMessage()
				#...
				self.revealMessage()


while opp := fetch_next_evm_opp(POLYGON_CHAINID):
	OpportunitiesEvaluator(MM_PREFS, opp).evaluate()