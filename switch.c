#include <wiringPi.h>
#include <time.h>

/*
 * The following are special constants measured in microseconds that define
 * the length between the certain signal outputs that we're using. Special
 * to note is that sigDelay is the gap between each contemporanous gap of
 * signals (so a binary transmissal).
 */
static const int sigDelay = 5364;
static const int active = 720;
static const int longGap = 471;
static const int shortGap = 125;

static const int pin = 7;
static const int sigCount = 50;

int main(void) {
	wiringPiSetup(); // Initialise wiringPi
	// piHighPri(); // Set to high priority mode (realtime)
	pinMode(pin, OUTPUT); // Enable specified pin

	int i = 0;
	while (i < sigCount) {

		// Print the off instruction (0101000101010101001111000)
		out(0);
		out(1);
		out(0);
		out(1);
		out(0);
		out(0);
		out(0);
		out(1);
		out(0);
		out(1);
		out(0);
		out(1);
		out(0);
		out(1);
		out(0);
		out(1);
		out(0);
		out(0);
		out(1);
		out(1);
		out(1);
		out(1);
		out(0);
		out(0);
		out(0);

		// Pause for the signal delay
		delayMicroseconds(sigDelay);

		// Add 1 to the sigcount
		i++;

	}
}

// Write a binary digit
int out(int digit) {

	if (digit) {
		// Write a 1 binary digit
		digitalWrite(pin, HIGH);
		delayMicroseconds(active - shortGap);
		digitalWrite(pin, LOW);
		delayMicroseconds(shortGap);
	} else {
		digitalWrite(pin, HIGH);
		delayMicroseconds(active - longGap);
		digitalWrite(pin, LOW);
		delayMicroseconds(longGap);
	}

}
