import { StyleSheet } from "react-native"
export const colors = {
  primary: '#0f49a0',
  secondary: '#108187',
  background: '#eaebf6',
  spare: '#694444',
  danger: '#c40404'
}


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: colors.background,
  },
  title: {
    fontSize:32,
    color: colors.primary
  },
  description: {
    fontSize: 22,
    color: colors.spare
  },
  notes: {
    fontSize:32,
    color: colors.secondary
  },
  delete: {
    color: colors.danger,
    fontSize:20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
    color: colors.primary
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 12,
    marginBottom: 8,
  },
  detail: {
    fontSize: 20, 
    color: '#1906ea'
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  detailContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    paddingTop: 60,
  },
  detailTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 12,
  },
  detailDescription: {
      fontSize: 16,
      color: colors.spare,
      lineHeight: 24,
      marginBottom: 20,
  },
  timestamp: {
      fontSize: 12,
      color: '#aaa',
  },
})