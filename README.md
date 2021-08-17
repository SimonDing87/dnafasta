## Synopsis

This goal of this project is to reconstruct a sequence of DNA that have been separated into fragments in FASTA format (https://en.wikipedia.org/wiki/FASTA_format).

Visit deployed app here:
https://dnafasta.herokuapp.com/

## Tech Stack
All technologies used were built from JavaScript.

Front-End: Angular.js

Back-End: Node.js

Build Tools: Grunt.js

Testing: Jasmine.js

## Installation

`npm install`

## Testing

`jasmine`

(TODO: add details to installation and testing)

## Introduction
To sequence the DNA for a given individual we typically fragment each chromosome to many small pieces that can be sequenced in parallel and then re-assemble the sequenced fragments into one long DNA sequence. In this task we ask that you take on a specific subtask of this process.

## Challenge
The input to the problem is at most 50 DNA sequences (i.e, the character set is limited to T/C/G/A) whose length does not exceed 1000 characters. The sequences are given in FASTA format (https://en.wikipedia.org/wiki/FASTA_format). These sequences are all different fragments of one chromosome. 
The specific set of sequences you will get satisfy a very unique property:  there exists a unique way to reconstruct the entire chromosome from these reads by gluing together pairs of reads that overlap by more than half their length. An example set of input strings is attached.
The output of your program should be this unique sequence that contains each of the given input strings as a substring.

## Approach

### 1) Longest Common Substring
My first goal was to figure out a way to see if a fragment overlapped another fragment by more than 50% of its length.  After coming up with an inefficient brute force method myself, I did a quick google search and discovered several better ways to solve this (https://en.wikipedia.org/wiki/Longest_common_substring_problem).  I chose the solution with dynamic programming because it was easier for me to understand and there was code readily available.  This is implemented as `longestCommonSubstring` in reconstructor.js

This algorithm compares two strings and builds a 2D array to stores the length of the current matching substring.  If a matches continue to occur for pairs of characters, the length from the previous indicies, (i-1, j-1), is used to count the increasing length. An example with "ABAB" and "BABA" is on the wiki page.

Time complexity: O(n*m)

n = string1 length

m = string2 length

This algorithm runs on average O(n*m) where n and m are the lengths of each string.  The runtime of this program can be improved to Θ(n+m) with different approach with the help of a generalized suffix tree from the same wiki page.  Given how slow the process takes for the input data, I would have liked to implement this second method and compare the speed of both.

Space Complexity: O(n*m)

An n x m matrix must be constructed for this approach.


### 2) Mapping fragments

Once I had information about which fragment matched with which, I wanted to think of a way to connect them all together.  The `longestCommonSubstring` function gave information about the length of the longet substring and the offset of the matching fragment.  The fragments would only consider to be a match if the longest substring was greater than half the length of the fragment in check, so that was one condition I checked for.  The other condition I checked for was to see if the fragment matched from the left or the right, and I checked this by making sure the offset was non-zero.  This function was implemented in `mapFragments`, and resulted in a nice linkedList ready for concatentation.  Since the fragments were organized in no particular order, I had to build a simple function to find the head of the linked list and traverse from there for easier concatenation later on.

Time complexity: O(n^2) * bigO of LCS

n = number of fragments

There are some heavy optimizations that can be done at this stage because I run the LCS algorithm on each and every pair of unqiue combinations of fragments, which is O(n^2) times the time complexity of the algorithm, where n is the number of fragments.  One example of an optimization is that instead of checking every unique pair combination, just check every unique set of 2.  The fragments will either match left-sided or right-sided, or not at all.  If it matches either left or right-sided, it is easy to map and store the fragments in the linked list appropriately.

Space complexity: O(n)

A linked list of size n-1 is constructed from this.

### 3) Reconstructing result

The last stage of my approach is to simply assemble the mapped fragments together into one string with `constructResult`.  The function would take the head of the linked list, take the first n characters based on the offset, go to the next fragment in the linked list and concatenate its first n characters, and repeat until the last fragment is reached.  Once the last fragment is reached, it will concatenate the entire fragent at the end.

Time complexity: O(n)

n = number of nodes in linked list

Space complexity: O(n)

The length of the final result will depend on how many fragments there are.

## Comments

The DNA animation I used was from:

http://codepen.io/heartbox/pen/NNQPOj

If the code takes too long to execute, I have put the solution in server/data/solution.txt

