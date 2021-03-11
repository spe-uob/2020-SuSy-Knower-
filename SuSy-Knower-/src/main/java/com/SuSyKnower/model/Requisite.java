package com.SuSyKnower.model;

public class Requisite {

    private int relationID;
    private int preReqID;
    private int postReqID;

    //setter
    public void setRelationID(int relationID) {this.relationID = relationID;}

    public void setPreReqID(int preReqID) {this.preReqID = preReqID;}

    public void setPostReqID(int postReqID) {this.postReqID = postReqID;}

    //getter
    public int getRelationID() {return relationID;}

    public int getPreReqID() {return preReqID;}

    public int getPostReqID() {return postReqID;}

    @Override
    public String toString() {
        return "Requisite{" +
                "relationID=" + relationID +
                ", preReqID=" + preReqID +
                ", postReqID=" + postReqID +
                '}';
    }
}
