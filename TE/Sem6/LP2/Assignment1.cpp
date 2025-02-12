#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>
#include <unordered_set>
using namespace std;

// Graph class
class Graph {
private:
    unordered_map<int, vector<int>> adjList;

public:
    // Add edge to the graph
    void addEdge(int u, int v) {
        adjList[u].push_back(v);
        adjList[v].push_back(u); // Since the graph is undirected
    }

    // Recursive DFS helper function
    void dfsHelper(int node, unordered_set<int> &visited) {
        // Mark the current node as visited
        visited.insert(node);
        cout << node << " ";

        // Recur for all adjacent nodes
        for (int neighbor : adjList[node]) {
            if (visited.find(neighbor) == visited.end()) {
                dfsHelper(neighbor, visited);
            }
        }
    }

    // Depth First Search (DFS)
    void dfs(int start) {
        unordered_set<int> visited;
        cout << "DFS traversal starting from node " << start << ": ";
        dfsHelper(start, visited);
        cout << endl;
    }

    // Breadth First Search (BFS)
    void bfs(int start) {
        unordered_set<int> visited;
        queue<int> q;

        // Start from the given node
        visited.insert(start);
        q.push(start);

        cout << "BFS traversal starting from node " << start << ": ";
        while (!q.empty()) {
            int node = q.front();
            q.pop();
            cout << node << " ";

            // Enqueue all unvisited neighbors
            for (int neighbor : adjList[node]) {
                if (visited.find(neighbor) == visited.end()) {
                    visited.insert(neighbor);
                    q.push(neighbor);
                }
            }
        }
        cout << endl;
    }
};

int main() {
    Graph g;

    // Create the graph
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 3);
    g.addEdge(1, 4);
    g.addEdge(2, 5);
    g.addEdge(2, 6);

    // Perform DFS and BFS
    g.dfs(0);
    g.bfs(0);

    return 0;
}
