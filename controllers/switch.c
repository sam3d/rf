#include <wiringPi.h>
#include <time.h>
#include <stdio.h>
#include <stdlib.h>

/*
 * The following are special constants measured in microseconds that define
 * the length between the certain signal outputs that we're using. Special
 * to note is that sigDelay is the gap between each discrete output of a
 * signal.
 */
static const int sigDelay = 5364;
static const int active = 720;
static const int longGap = 471;
static const int shortGap = 125;

static const int pin = 7;
static const int sigCount = 3;
static const int tryCount = 4;

/*
 * Special identifiers and magic numbers. These are to identify the particular
 * plug item we'll be interacting with! NOTE: We don't actually need these
 * anymore as we supply them as arguments, but nice to have them around for
 * reference.
 */

// int off[] = {0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0};
// int on[] = {0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0};


int main(int argc, char **argv) {

	wiringPiSetup(); // Initialise wiringPi
	piHiPri(1); // Set to high priority mode (realtime)
	pinMode(pin, OUTPUT); // Enable specified pin

	// Create multidimensional array for inputs
	int cmdc = argc - 1;
	int cmdv[cmdc][25];

	// Parse the inputs
	int i = 1;
	while (i < argc) {

		printf("%s\n", argv[i]);

		// Grab the value from the input string
		int j = 0;
		while (j < 25) {
			cmdv[i - 1][j] = (int) argv[i][j] - 48;
			j++;
		}

		i++;
	}

	// Try to output the signal a specified number of times
	int m = 0;
	while (m < tryCount) {

		int k = 0;
		while (k < cmdc) {

			// Command output
			int j = 0;
			while (j < sigCount) {
				cOut(cmdv[k]); // Output the command
				delayMicroseconds(sigDelay); // Delay for the signal
				j++;
			}

			k++;

		}

		m++;

	}
}

// Write out a binary command string
int cOut(int *cmd) {

	int i = 0;
	while (i < 25) {
		bOut(cmd[i]);
		i++;
	}

}

// Write a binary digit
int bOut(int digit) {

	if (digit) {
		// Write a 1 binary digit
		digitalWrite(pin, HIGH);
		delayMicroseconds(active - shortGap);
		digitalWrite(pin, LOW);
		delayMicroseconds(shortGap);
	} else {
		// Write a 0 binary digit
		digitalWrite(pin, HIGH);
		delayMicroseconds(active - longGap);
		digitalWrite(pin, LOW);
		delayMicroseconds(longGap);
	}

}
