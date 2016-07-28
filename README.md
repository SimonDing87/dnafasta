## Synopsis

This goal of this project is to reconstruct a sequence of DNA that have been separated into fragments in FASTA format (https://en.wikipedia.org/wiki/FASTA_format).  

## Tech Stack
All technologies used were built from JavaScript.

Front-End: Angular.js

Back-End: Node.js

Build Tools: Grunt.js

Testing: Jasmine.js


## Introduction
To sequence the DNA for a given individual we typically fragment each chromosome to many small pieces that can be sequenced in parallel and then re-assemble the sequenced fragments into one long DNA sequence. In this task we ask that you take on a specific subtask of this process.

## Challenge
The input to the problem is at most 50 DNA sequences (i.e, the character set is limited to T/C/G/A) whose length does not exceed 1000 characters. The sequences are given in FASTA format (https://en.wikipedia.org/wiki/FASTA_format). These sequences are all different fragments of one chromosome. 
The specific set of sequences you will get satisfy a very unique property:  there exists a unique way to reconstruct the entire chromosome from these reads by gluing together pairs of reads that overlap by more than half their length. An example set of input strings is attached.
The output of your program should be this unique sequence that contains each of the given input strings as a substring.

## Approach
